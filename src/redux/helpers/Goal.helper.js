import { useSelector } from "react-redux";
import { GetAllChallengesForGoalOfPeriod, GetAllDailyChallengesForGoal, GetAllWeeklyChallengesForGoal, GetChallengeProgressForPeriod } from "./Challenge.helper";
import { GetLogEndValueForPeriod, GetLogsByActivityIdForPeriod } from "./Log.helper";
import { GetDayOfSeason, GetPeriodOfSeason, GetSeasonById, GetSeasonProgressRatioAtTime, GetSeasonSuccessXp, GetWeekOfSeason } from "./Season.helper";

export function GetGoalById(id) {
	return useSelector((state) => state.goal.goals.find(g => g.id === id))
}

export function GetGoalProjectedResultAtTime(goal, unixTimestamp) {
	const season = useSelector((state) => state.season.seasons.find(s => s.id === goal.seasonId))
	const ratio = GetSeasonProgressRatioAtTime(season, unixTimestamp)
	const goalRange = goal.goalLagEndValue-goal.goalLagStartValue
	switch (goal.goalLagProgressCurve) {
		case 'linear':
		default:
			return ratio*goalRange+goal.goalLagStartValue
	}
}

export function GetGoalProjectedXpAtTime(goal, unixTimestamp) {
	const season = useSelector((state) => state.season.seasons.find(s => s.id === goal.seasonId))
	const nominalXp = GetSeasonSuccessXp(season) 
	const ratio = GetSeasonProgressRatioAtTime(season, unixTimestamp)
	return ratio*nominalXp*goal.seasonXpRatio
}

export function GetGoalSuccessXp(goal) {
	const season = useSelector((state) => state.season.seasons.find(s => s.id === goal.seasonId))
	return GetSeasonSuccessXp(season)*goal.seasonXpRatio
}

export function GetGoalProgressForPeriod(goal, periodName) {
	const season = GetSeasonById(goal.seasonId);
	const period = periodName === 'daily' ? GetDayOfSeason(season) : GetWeekOfSeason(season); 
	const challenges = GetAllChallengesForGoalOfPeriod(goal.id, periodName);
	let done = 0;
	let xp = 0;
	challenges.forEach(c => {
		const progress = GetChallengeProgressForPeriod(c, period.start, period.end);
		xp += progress.xp;
		done += Number(progress.done);
	});
	return { xp: xp, done: done};
}