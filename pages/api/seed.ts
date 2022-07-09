import { Activity, ActivityVariation, Category, Prisma, Season } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Obj } from 'reselect/es/types'
import prisma from '../../lib/prisma'

type ActivityWithUnitAndVariations = Prisma.ActivityGetPayload<{
	include: {
		unit: true,
		variations: true
	}
}>

type GoalWithChallengesAndLagActivity = Prisma.GoalGetPayload<{
	include: {
		challenges: true,
		lagActivity: true
	}
}>

type LogWithActivity = Prisma.LogGetPayload<{
	include: {
		activity: true,
	}
}>

const ActivityConnectOrCreate = (activity: Activity, variation: ActivityVariation) => {
	return {
		connectOrCreate: {
			where: {
				activityId_variationId: {
					activityId: activity.id,
					variationId: variation.id,
				}
			},
			create: {
				activityId: activity.id,
				variationId: variation.id,
			}
		}
	}
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			handlePOST(req, res);
			return;
		default:
			throw new Error(`HTTP ${req.method} method is not supported at this route.`)
	}
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

	const { user, categories, seasons, goals, activities, challenges, logs } = req.body;

	const act:ActivityWithUnitAndVariations[] = await prisma.$transaction(
		activities.map(a => prisma.activity.upsert({
			where: {
				userId_label: {
					userId: user.id,
					label: a.label
				}
			},
			update: {},
			create: {
				user: { connect: { id: user.id } },
				label: a.label,
				note: a.note !== '' ? a.note : undefined,
				isCumulative: Boolean(a.isReportingIncremental),
				unit: {
					connectOrCreate: {
						where: {
							type_unit: {
								type: a.type,
								unit: a.unit
							}
						},
						create: {
							type: a.type,
							unit: a.unit
						}
					}
				},
				variations: {
					create: [
						{ label: '' },
						...a.variations
							.split(',')
							.filter(v => v !== '')
							.map(v => {
								return {
									label: v
								}
							})
					]
				}
			},
			include: {
				unit: true,
				variations: true
			}
		}))
	)
	
	const cat: Category[] = await prisma.$transaction(
		categories.map(c => prisma.category.upsert({
			where: {
				userId_name: {
					userId: user.id,
					name: c.name
				}
			},
			update: {},
			create: {
				user: { connect: { id: user.id } },
				name: c.name,
				icon: c.icon !== '' ? c.icon : undefined,
				description: c.description !== '' ? c.description : undefined
			}
		}))
	)

	const szn: Season[] = await prisma.$transaction(
		seasons.map(s => prisma.season.upsert({
			where: {
				userId_start_length: {
					userId: user.id,
					start: (new Date(s.start*1000)).toISOString(),
					length: s.length
				}
			},
			update: {},
			create: {
				user: { connect: { id: user.id } },
				start: (new Date(s.start*1000)).toISOString(),
				length: s.length,
				title: s.title,
				description: s.description !== '' ? s.description : undefined,
				currentXP: s.currentXP,
				currentLevel: s.currentLevel,
				rewards: {
					create: [
						{ label: s.reward1Label, level: s.reward1Level, isClaimed: Boolean(s.reward1Claimed) },
						{ label: s.reward2Label, level: s.reward2Level, isClaimed: Boolean(s.reward2Claimed) },
						{ label: s.reward3Label, level: s.reward3Level, isClaimed: Boolean(s.reward3Claimed) },
						{ label: s.reward4Label, level: s.reward4Level, isClaimed: Boolean(s.reward4Claimed) },
					]
				}
			}
		}))
	)

	let gol: GoalWithChallengesAndLagActivity[] | Object
	const golMap = goals.map(g => {
		const s = szn.find(s => s.title === seasons.find(s => s.id === g.seasonId).title)
		const c = cat.find(s => s.name === categories.find(c => c.id === g.categoryId).name)
		const a = act.find(a => a.label === activities.find(a => a.id === g.goalLagActivityId).label)
		const vI = a.variations.findIndex(v => v.label === g.goalLagActivityVariation)
		return prisma.goal.create({
			data: {
				season: { connect: { id:s.id } },
				category: { connect: { id:c.id } },
				lagActivity: ActivityConnectOrCreate(a, a.variations[Math.max(0,vI)]),
				lagStartValue: g.goalLagStartValue,
				lagEndValue: g.goalLagEndValue,
				lagProjectionCurve: 'LINEAR',
				note: g.goalNote !== '' ? g.goalNote : undefined,
				currentXP: g.currentXP,
				challenges: {
					create: challenges.filter(c => c.goalId === g.id).map(c => {
						const a = act.find(a => a.label === activities.find(a => a.id === c.taskActivityId).label)
						const vI = a.variations.findIndex(v => v.label === c.taskVariation)
						return {
							activity: ActivityConnectOrCreate(a, a.variations[Math.max(0,vI)]),
							label: c.taskLabel,
							target: c.taskAmount,
							xp: c.taskXP,
							period: c.period === 'weekly' ? 'WEEKLY' : 'DAILY',
							isTemplate: Boolean(c.isTemplate)
						}
					})
				}
			},
			include: {
				challenges: true,
				lagActivity: true
			}
		})
	})
	try {
		gol = await prisma.$transaction(golMap)
	} catch (error) {
		gol = {
			e: error,			
			map: golMap
		}
	}

	let log: LogWithActivity[] | Object
	const logMap = logs.map(l => { 
		const a = act.find(a => a.label === activities.find(a => a.id === l.activityId).label)
		const vI = a.variations.findIndex(v => v.label === l.variation)
		return prisma.log.create({
			data: {
				user: { connect: { id: user.id } },
				timestamp: (new Date(l.timestamp*1000)).toISOString(),
				value: l.value,
				activity: ActivityConnectOrCreate(a, a.variations[Math.max(0,vI)]),
			},
			include: {
				activity: true
			}
		})
	})
	try {
		log = await prisma.$transaction(logMap)
	} catch (error) {
		log = {
			e: error,			
			map: logMap
		}
	}

	const output = {
		act,
		cat,
		szn,
		gol,
		log
	}

	res.json(output)
}