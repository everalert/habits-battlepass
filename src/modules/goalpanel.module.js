import { connect } from 'react-redux'
import GoalPanelHeader from '../elements/goalPanel/GoalPanelHeader.element'
import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import { GetCurrentUnixTimestamp, RoundN } from '../helpers/Math.helper'
import InputQuickLog from '../modules/input/InputQuickLog.module'
import { FormatActivityValue, GetActivityUnitPrecision } from '../redux/helpers/Activity.helpers'
import { GetAllDailyChallengesForGoal, GetAllWeeklyChallengesForGoal } from '../redux/helpers/Challenge.helper'
import { GetGoalProjectedResultAtTime, GetGoalProjectedXpAtTime, GetGoalSuccessXp } from '../redux/helpers/Goal.helper'
import { GetLogEndValueForPeriod } from '../redux/helpers/Log.helper'
import { GetDayOfSeason, GetWeekOfSeason } from '../redux/helpers/Season.helper'
import GoalProgressBar from './goal/GoalProgressBar.module'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'
import TaskCollection from './task/TaskCollection.module'


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
		goalLagProjectedResultDelta: FormatActivityValue(lagActivity, lagProjectedResultDeltaRaw, undefined, false).value,
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
		goalLagValue,
		goalLagUnit,
		goalLagProjectedResultDeltaRaw,
		goalLagProjectedResultDelta,
		goalLagProjectedDir,
		goalProjectedXpDelta }) {

	return (
		<div>
			<GoalPanelHeader goal={goal} lagActivity={goalLagActivity} />
			<GoalProgressBar goal={goal} />
			<div className='mx-auto outline outline-1 outline-gray-800 rounded-lg'><LineChart/></div>
			<div className="grid grid-cols-2 gap-y-4 px-4 py-8 group relative">
				<InputQuickLog activity={goalLagActivity} variation={goal.goalLagActivityVariation} />
				<StatPar abs={goal.currentXP} rel={goalProjectedXpDelta} relRaw={goalProjectedXpDelta} relDir={1} unit='XP' />
				<StatPar abs={goalLagValue} rel={goalLagProjectedResultDelta} relRaw={goalLagProjectedResultDeltaRaw} relDir={goalLagProjectedDir} unit={goalLagUnit} />
				<StatTaskProgress label={`DAY ${dayOfSeason.no}`} challenges={goalDailyTasks} timestamp={timestamp} />
				<StatTaskProgress label={`WEEK ${weekOfSeason.no}`} challenges={goalWeeklyTasks} timestamp={timestamp} />
			</div>
			<div className="flex flex-col gap-6">
				<TaskCollection tasks={goalDailyTasks} periodObj={dayOfSeason} />
				<TaskCollection tasks={goalWeeklyTasks} periodObj={weekOfSeason} />
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(GoalPanel);