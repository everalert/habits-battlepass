import { ActivityVariation, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


type LogWithActVarCombo = Prisma.LogGetPayload<{
	include: {
		activity: true,
	}
}>


const ActVarComboConnectOrCreate = (variation) => {
	return {
		connectOrCreate: {
			where: {
				activityId_variationId: {
					activityId: variation.activityId,
					variationId: variation.id,
				}
			},
			create: {
				activityId: variation.activityId,
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

	const {
		userId,
		activityId,
		variationId,
		value,
		timestamp
	} = req.body;

	const actv: ActivityVariation | null = await prisma.activityVariation.findFirst({
		where: {
			AND: [
				{ id: variationId },
				{ activityId: activityId }
			]
		},
	})

	if (actv === null)
		throw new Error(`Activity ${activityId} and Variation ${variationId} are not a valid combination.`);
		
	const log: LogWithActVarCombo = await prisma.log.create({
		data: {
			user: { connect: { id: userId } },
			timestamp,
			value,
			activity: ActVarComboConnectOrCreate(actv),
		},
		include: {
			activity: true
		}
	})

	res.json(log)

}