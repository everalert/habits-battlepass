import { useSelector } from "react-redux";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { GetAllChallengesForGoalOfPeriod, GetChallengeProgressForPeriod } from "./Challenge.helper";
import { GetDayOfSeason, GetSeasonProgressRatioAtTime, GetSeasonSuccessXp, GetWeekOfSeason } from "./Season.helper";

export function GetGoalById(id) {
	return useSelector((state) => state.goal.goals.find(g => g.id === id))
}

export function PrepareNewGoal(timestamp = GetCurrentUnixTimestamp()) {
	const base = {...useSelector((state) => state.goal.base)};
	return Object.assign(base, { timestamp:timestamp });
}

export function GetGoalProjectedResultAtTime(season, goal, unixTimestamp) {
	const ratio = GetSeasonProgressRatioAtTime(season, unixTimestamp)
	const goalRange = goal.goalLagEndValue-goal.goalLagStartValue
	switch (goal.goalLagProgressCurve) {
		case 'linear':
		default:
			return ratio*goalRange+goal.goalLagStartValue
	}
}

export function GetGoalProjectedXpAtTime(goal, season, unixTimestamp) {
	const nominalXp = GetSeasonSuccessXp(season) 
	const ratio = GetSeasonProgressRatioAtTime(season, unixTimestamp)
	return ratio*nominalXp*goal.seasonXpRatio
}

export function GetGoalSuccessXp(goal, season) {
	return GetSeasonSuccessXp(season)*goal.seasonXpRatio
}

export function GetGoalProgressForPeriod(season, goal, challenges, activities, logs, periodName) {
	const period = periodName === 'daily' ? GetDayOfSeason(season) : GetWeekOfSeason(season); 
	const filteredchallenges = GetAllChallengesForGoalOfPeriod(challenges, goal.id, periodName);
	let done = 0;
	let xp = 0;
	filteredchallenges.forEach(c => {
		const isIncremental = activities.find(a => a.id === c.taskActivityId).isReportingIncremental;
		const progress = GetChallengeProgressForPeriod(logs, c, isIncremental, period.start, period.end);
		xp += progress.xp;
		done += Number(progress.done);
	});
	return { xp: xp, done: done};
}