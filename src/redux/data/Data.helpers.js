import { IsChallengeOfLog } from "../helpers/Challenge.helper";
import { GetLogEndValueForPeriod } from "../helpers/Log.helper";
import { GetDayOfSeasonAtTimestamp, GetWeekOfSeasonAtTimestamp } from "../helpers/Season.helper";


export const getListsFromDataState = (state) => {
	return {
		seasons: state.season.seasons,
		categories: state.category.categories,
		goals: state.goal.goals,
		activities: state.activity.activities,
		challenges: state.challenge.challenges,
		logs: state.log.logs,
	}
}

export const filterLogsByActivity = (logs, activityId, variation = '') => {
	return logs.filter(l => l.activityId === activityId && IsChallengeOfLog(l.variation, variation));
}

export const getChallengeEndValueAtTimestamp = (challenge, timestamp, { logs, activities, goals, seasons }) => {
	const activity = activities.find(a => a.id === challenge.taskActivityId);
	const goal = goals.find(g => g.id === challenge.goalId);
	const season = seasons.find(s => s.id === goal.seasonId);
	const { start, end } = challenge.period === 'daily' ? GetDayOfSeasonAtTimestamp(season, timestamp) : GetWeekOfSeasonAtTimestamp(season, timestamp);
	const filteredLogs = logs.filter(l => l.timestamp < end && l.timestamp >= start && IsChallengeOfLog(l.variation, challenge.taskVariation));
	const endValue = GetLogEndValueForPeriod(filteredLogs, activity.id, activity.isReportingIncremental, start, end);
	return endValue;
}

export const getChallengeStatusAtTimestamp = (challenge, timestamp, state) => {
	const endValue = getChallengeEndValueAtTimestamp(challenge, timestamp, getListsFromDataState(state));
	const done = endValue >= challenge.taskAmount;
	const xp = done ? challenge.taskXP : 0;
	return { done, xp }
}