import { useSelector } from "react-redux";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { GetActivityById } from "./Activity.helpers";

export function GetLogsByActivityIdForPeriod(activityId, startTime = 0, endTime = GetCurrentUnixTimestamp()) {
	return useSelector((state) => state.log.logs.filter(l => l.activityId === activityId && l.timestamp >= startTime && l.timestamp < endTime))
} 

export function GetLogEndValueForPeriod(activityId, startTime = 0, endTime = GetCurrentUnixTimestamp()) {
	const activity = GetActivityById(activityId);
	if (activity.isReportingIncremental) {
		let total = 0;
		const logs = GetLogsByActivityIdForPeriod(activityId, startTime, endTime);
		logs.forEach(l => { total = total+l.value })
		return total;
	} else {
		return GetLogsByActivityIdForPeriod(activityId, 0, endTime).pop().value;
	}
}