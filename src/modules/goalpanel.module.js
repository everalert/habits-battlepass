import { connect } from 'react-redux'
import GoalPanelHeader from '../elements/goalPanel/GoalPanelHeader.element'
import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import { GetCurrentUnixTimestamp, RoundN } from '../helpers/Math.helper'
import InputQuickLog from '../modules/input/InputQuickLog.module'
import { FormatActivityValue, GetActivityUnitPrecision } from '../redux/helpers/Activity.helpers'
import { GetAllDailyChallengesForGoal, GetAllWeeklyChallengesForGoal } from '../redux/helpers/Challenge.helper'
import { GetGoalProgressForPeriod, GetGoalProjectedResultAtTime, GetGoalProjectedXpAtTime, GetGoalSuccessXp } from '../redux/helpers/Goal.helper'
import { GetLogEndValueForPeriod } from '../redux/helpers/Log.helper'
import { GetDayOfSeason, GetWeekOfSeason } from '../redux/helpers/Season.helper'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'
import TaskCollection from './task/TaskCollection.module'


const mapStateToProps = (state, ownProps) => {
	const timestamp = GetCurrentUnixTimestamp();
	const season = state.data.season.seasons[state.data.season.active];
	const goal = ownProps.goal;
	const activities = state.data.activity.activities;
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
		season: season,
		challenges: challenges,
		dayOfSeason: GetDayOfSeason(season),
		weekOfSeason: GetWeekOfSeason(season),
		goalDailyTasks: GetAllDailyChallengesForGoal(challenges, goal.id),
		goalWeeklyTasks: GetAllWeeklyChallengesForGoal(challenges, goal.id),
		goalDailyProgress: GetGoalProgressForPeriod(season, goal, challenges, activities, logs, 'daily'),
		goalWeeklyProgress: GetGoalProgressForPeriod(season, goal, challenges, activities, logs, 'weekly'),
		goalLagActivity: lagActivity,
		goalLagResultRaw: lagResultRaw,
		goalLagProjectedResult: lagProjectedResult,
		goalLagValue: lagResult.value,
		goalLagUnit: lagResult.unit,
		goalLagProjectedResultDeltaRaw: lagProjectedResultDeltaRaw,
		goalLagProjectedResultDelta: FormatActivityValue(lagActivity, lagProjectedResultDeltaRaw, undefined, false).value,
		goalLagProjectedDir: lagProjectedResult-goal.goalLagStartValue,
		goalSuccessXp: GetGoalSuccessXp(goal, season),
		goalProjectedXpDelta: goal.currentXP-goalProjectedXp,
		...ownProps,
	}
}


function GoalPanel({
		goal,
		dayOfSeason,
		weekOfSeason,
		goalDailyTasks,
		goalWeeklyTasks,
		goalDailyProgress,
		goalWeeklyProgress,
		goalLagActivity,
		goalLagValue,
		goalLagUnit,
		goalLagProjectedResultDeltaRaw,
		goalLagProjectedResultDelta,
		goalLagProjectedDir,
		goalSuccessXp,
		goalProjectedXpDelta }) {

	return (
		<div>
			<GoalPanelHeader goal={goal} lagActivity={goalLagActivity} />
			<div className='flex gap-4 justify-center'>
				<div className='relative'>
					<svg xmlns="http://www.w3.org/2000/svg" className="absolute h-32 w-32 left-0 top-0" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 0 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" className="absolute h-20 w-20 left-6 top-6 fill-black" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
					</svg>
					<div className="w-32 h-32">
						<RadialBar size={128} value={goal.currentXP} max={goalSuccessXp} thickness={8} corner={1} delay={500} />
					</div>
				</div>
				<div className='outline outline-1 outline-gray-800 rounded-lg'><LineChart/></div>
			</div>
			<div className="grid grid-cols-2 gap-y-4 px-4 py-8 group relative">
				<InputQuickLog activity={goalLagActivity} variation={goal.goalLagActivityVariation} />
				<StatPar abs={goal.currentXP} rel={goalProjectedXpDelta} relRaw={goalProjectedXpDelta} relDir={1} unit='XP' />
				<StatPar abs={goalLagValue} rel={goalLagProjectedResultDelta} relRaw={goalLagProjectedResultDeltaRaw} relDir={goalLagProjectedDir} unit={goalLagUnit} />
				<StatTaskProgress over={goalDailyProgress.done} under={goalDailyTasks.length} value={goalDailyProgress.xp} unit='XP' label={`DAY ${dayOfSeason.no}`} />
				<StatTaskProgress over={goalWeeklyProgress.done} under={goalWeeklyTasks.length} value={goalWeeklyProgress.xp} unit='XP' label={`WEEK ${weekOfSeason.no}`} />
			</div>
			<div className="flex flex-col gap-6">
				<TaskCollection tasks={goalDailyTasks} periodObj={dayOfSeason} />
				<TaskCollection tasks={goalWeeklyTasks} periodObj={weekOfSeason} />
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(GoalPanel);