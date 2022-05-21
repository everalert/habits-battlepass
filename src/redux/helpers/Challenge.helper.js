import { useSelector } from "react-redux";
import { SecondsToHMMSS } from "../../helpers/Math.helper";
import { FormatActivityValue, GetActivityById, GetActivityUnit } from "./Activity.helpers";

export function GetAllChallengesForGoal(goalId) {
	return useSelector((state) => state.challenge.challenges.filter(c => c.goalId === goalId))
}

export function GetAllChallengesForGoalOfPeriod(goalId, period) {
	return useSelector((state) => state.challenge.challenges.filter(c => c.goalId === goalId && c.period === period))
}

export function GetAllDailyChallengesForGoal(goalId) {
	return GetAllChallengesForGoalOfPeriod(goalId,'daily')
}

export function GetAllWeeklyChallengesForGoal(goalId) {
	return GetAllChallengesForGoalOfPeriod(goalId,'weekly')
}

export function FormatChallengeLabel(challenge, timeFunc = SecondsToHMMSS, timeUnit = '') {
	const activity = GetActivityById(challenge.taskActivityId);
	const activityUnit = activity.type === 'time' ? timeUnit : GetActivityUnit(activity);
	const activityValue = FormatActivityValue(activity, challenge.taskAmount, timeFunc)
	const { taskLabel } = challenge;
	let newLabel;
	newLabel = taskLabel.replace('{UNIT}', `${activityValue.value} ${activityUnit}`);
	newLabel = newLabel.replace('{ACTIVITY}', `${activity.label}`);
	return newLabel;
}