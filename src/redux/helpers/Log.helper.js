import { useSelector } from "react-redux";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

export function PrepareNewLog(timestamp = GetCurrentUnixTimestamp()) {
	const base = {...useSelector((state) => state.data.log.base)};
	return Object.assign(base, { timestamp:timestamp });
}

export function GetLogsByActivityIdForPeriod(logs, activityId, startTime = 0, endTime = GetCurrentUnixTimestamp()) {
	return logs.length ? logs.filter(l => l.activityId === activityId && l.timestamp >= startTime && l.timestamp < endTime) : []
} 

export function GetLogEndValueForPeriod(logs, activityId, activityIsIncremental, startTime = 0, endTime = GetCurrentUnixTimestamp()) {
	if (logs.length === 0)
		return 0;
	if (activityIsIncremental) {
		let total = 0;
		const filteredLogs = GetLogsByActivityIdForPeriod(logs, activityId, startTime, endTime);
		filteredLogs.forEach(l => { total = total+l.value })
		return total;
	} else {
		return GetLogsByActivityIdForPeriod(logs, activityId, 0, endTime).pop().value;
	}
}