import { enableMapSet } from "immer";
import { useSelector } from "react-redux";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

export function GetAllChallengesForGoal(goalId) {
	return useSelector((state) => state.challenge.challenges.filter(c => c.goalId === goalId))
}

export function GetAllChallengesForGoalOfPeriod(goalId,period) {
	return useSelector((state) => state.challenge.challenges.filter(c => c.goalId === goalId && c.period === period))
}

export function GetAllDailyChallengesForGoal(goalId) {
	return GetAllChallengesForGoalOfPeriod(goalId,'daily')
}

export function GetAllWeeklyChallengesForGoal(goalId) {
	return GetAllChallengesForGoalOfPeriod(goalId,'weekly')
}