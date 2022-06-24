import { Tab } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { connect } from 'react-redux'
import GoalPanelHeader from '../elements/goalPanel/GoalPanelHeader.element'
import { FormatNumber, GetCurrentUnixTimestamp, RoundN, SecondsToMinutes } from '../helpers/Math.helper'
import InputQuickLog from '../modules/input/InputQuickLog.module'
import { FormatActivityValue, GetActivityUnitPrecision } from '../redux/helpers/Activity.helpers'
import { GetAllDailyChallengesForGoal, GetAllWeeklyChallengesForGoal } from '../redux/helpers/Challenge.helper'
import { GetGoalProjectedResultAtTime, GetGoalProjectedXpAtTime } from '../redux/helpers/Goal.helper'
import { GetLogEndValueForPeriod } from '../redux/helpers/Log.helper'
import { GetDayOfSeason, GetWeekOfSeason } from '../redux/helpers/Season.helper'
import GoalProgressBar from './goal/GoalProgressBar.module'
import GoalProgressGraph from './goal/GoalProgressGraph.module'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'
import TaskChallenge from './task/TaskChallenge.module'
import { useSpring, animated } from '@react-spring/web'


const AnimatedStatPar = animated(StatPar);


const mapStateToProps = (state, ownProps) => {
	const timestamp = GetCurrentUnixTimestamp();
	const season = state.data.season.seasons[state.data.season.active];
	const goal = ownProps.goal;
	const challenges = state.data.challenge.challenges;
	const logs = state.data.log.logs;
	const lagActivity = state.data.activity.activities.find(a => a.id === goal.goalLagActivityId);
	const lagPrecision = GetActivityUnitPrecision(lagActivity);
	const lagResultRaw = RoundN(GetLogEndValueForPeriod(logs, lagActivity.id, lagActivity.isReportingIncremental, season.start, season.start+season.length), lagPrecision);
	const lagResult = FormatActivityValue(lagActivity, lagResultRaw);
	const lagProjectedResult = RoundN(GetGoalProjectedResultAtTime(season, goal, timestamp), lagPrecision);
	const lagProjectedResultDeltaRaw = lagResultRaw-lagProjectedResult;
	const goalProjectedXp = Math.round(GetGoalProjectedXpAtTime(goal, season, timestamp));
	return {
		timestamp,
		season,
		challenges,
		dayOfSeason: GetDayOfSeason(season),
		weekOfSeason: GetWeekOfSeason(season),
		goalDailyTasks: GetAllDailyChallengesForGoal(challenges, goal.id),
		goalWeeklyTasks: GetAllWeeklyChallengesForGoal(challenges, goal.id),
		goalLagActivity: lagActivity,
		goalLagResultRaw: lagResultRaw,
		goalLagProjectedResult: lagProjectedResult,
		goalLagValue: lagResult.value,
		goalLagUnit: lagResult.unit,
		goalLagProjectedResultDeltaRaw: lagProjectedResultDeltaRaw,
		goalLagProjectedDir: lagProjectedResult-goal.goalLagStartValue,
		goalProjectedXpDelta: goal.currentXP-goalProjectedXp,
		...ownProps,
	}
}


function GoalPanel({
		timestamp,
		goal,
		dayOfSeason,
		weekOfSeason,
		goalDailyTasks,
		goalWeeklyTasks,
		goalLagActivity,
		goalLagResultRaw,
		goalLagUnit,
		goalLagProjectedResultDeltaRaw,
		goalLagProjectedDir,
		goalProjectedXpDelta }) {
	
	const timeFunc = s => FormatNumber(Math.floor(SecondsToMinutes(s)))

	const challengePages = [
		{ label:'DAILY', tasks:goalDailyTasks, period:dayOfSeason },
		{ label:'WEEKLY', tasks:goalWeeklyTasks, period:weekOfSeason },
	]

	const { aXpAbs, aXpRel, aLagAbs, aLagRel, aLagDir } = useSpring({
		aXpAbs: goal.currentXP,
		aXpRel: goalProjectedXpDelta,
		aLagAbs: goalLagResultRaw,
		aLagRel: goalLagProjectedResultDeltaRaw,
		aLagDir: goalLagProjectedDir
	})

	return (
		<div className='relative w-[19rem] overflow-hidden'>
			<GoalPanelHeader goal={goal} lagActivity={goalLagActivity} />
			<GoalProgressBar goal={goal} />
			<div className='mx-2 h-32 outline outline-1 outline-zinc-800 rounded'>
				<GoalProgressGraph goal={goal} />
			</div>
			<div className="grid grid-cols-2 gap-y-4 px-4 py-8 group relative">
				<InputQuickLog activity={goalLagActivity} variation={goal.goalLagActivityVariation} />
				<AnimatedStatPar
					abs={aXpAbs}
					absDecimals={0}
					rel={aXpRel}
					relRaw={aXpRel}
					relDir={1}
					relDecimals={0}
					unit='XP' />
				<AnimatedStatPar
					abs={aLagAbs.to(x => FormatActivityValue(goalLagActivity, x, undefined, false, 1).value)}
					absDecimals={1}
					rel={aLagRel.to(x => FormatActivityValue(goalLagActivity, x, undefined, false, 1).value)}
					relRaw={aLagRel}
					relDir={aLagDir}
					relDecimals={1}
					unit={goalLagUnit} />
				<StatTaskProgress label={`DAY ${dayOfSeason.no}`} challenges={goalDailyTasks} timestamp={timestamp} />
				<StatTaskProgress label={`WEEK ${weekOfSeason.no}`} challenges={goalWeeklyTasks} timestamp={timestamp} />
			</div>
			<div className="absolute -bottom-80 left-[0.5rem] flex flex-col gap-6 hover:bottom-0 transition-all">
				<ChevronUpIcon className='absolute w-4 h-4 -top-4 left-1/2 -ml-2 fill-zinc-400' />
				<Tab.Group as='div' defaultIndex={0} className="rounded-t-lg bg-black outline outline-2 outline-zinc-900">
					<Tab.List className="flex flex-wrap justify-center h-8 mx-4 gap-1 select-none">
						{ challengePages.map((p,i) => 
							<Tab as='div' key={i} className={`mt-2`}>
								{({selected}) => <span className={`${selected?'bg-zinc-700 font-medium':'bg-zinc-900'} text-zinc-300 py-0.5 px-2 rounded`}>{p.label}</span>}
							</Tab>
						) }
					</Tab.List>
					<Tab.Panels className="">
						{ challengePages.map((p,i) => 
							<Tab.Panel as='div' key={i} className='w-[18rem] h-72 mx-auto p-2 flex flex-col gap-2'>
								{ p.tasks.map(t => (<TaskChallenge key={t.id} task={t} periodObj={p.period} timeFunc={timeFunc} />))}
							</Tab.Panel>
						) }
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(GoalPanel);