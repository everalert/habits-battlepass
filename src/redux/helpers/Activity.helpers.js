import { useSelector } from "react-redux";
import { SecondsToHMMSS } from "../../helpers/Math.helper";

export function GetActivityById(id) {
	return useSelector((state) => state.activity.activities.find(a => a.id === id))
}

export function GetActivityUnit(activity) {
	switch (activity.type) {
		case 'counter':
			return activity.unit;
		case 'weight':
			return 'Kg';
		default:
			return '';
	}
}

export function FormatActivityValue(activity, value, timeFormatFunction = SecondsToHMMSS) {
	let output = { value: 0, unit: '' }
	switch (activity.type) {
		case 'time':
			output.value = timeFormatFunction(value);
			break;
		case 'weight':
			output.value = value;
			output.unit = 'Kg';
			break;
		case 'counter':
		default:
			output.value = value;
			output.unit = activity.unit;
			break;
	}
	return output;
}