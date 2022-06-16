import { useSelector } from "react-redux";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { IsChallengeOfLog } from "./Challenge.helper";

export function PrepareNewLog(timestamp = GetCurrentUnixTimestamp()) {
	const base = {...useSelector((state) => state.data.log.base)};
	return Object.assign(base, { timestamp:timestamp });
}

export function GetLogsByActivityIdForPeriod(logs, activityId, startTime = 0, endTime = GetCurrentUnixTimestamp(), variation = '') {
	return logs.length ? logs.filter(l => l.activityId === activityId && l.timestamp >= startTime && l.timestamp < endTime && IsChallengeOfLog(l.variation, variation)) : []
} 

export function GetLogEndValueForPeriod(logs, activityId, activityIsIncremental, startTime = 0, endTime = GetCurrentUnixTimestamp(), variation = '') {
	if (logs.length === 0)
		return 0;
	if (activityIsIncremental) {
		let total = 0;
		const filteredLogs = GetLogsByActivityIdForPeriod(logs, activityId, startTime, endTime, variation);
		filteredLogs.forEach(l => { total = total+l.value })
		return total;
	} else {
		return GetLogsByActivityIdForPeriod(logs, activityId, 0, endTime).pop().value;
	}
}