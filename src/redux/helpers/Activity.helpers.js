import { useSelector } from "react-redux";
import { FormatNumber, SecondsToHMMSS } from "../../helpers/Math.helper";

export function GetActivityById(id) {
	return useSelector((state) => state.data.activity.activities.find(a => a.id === id))
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

export function GetActivityUnitPrecision(activity) {
	switch (activity.type) {
		case 'weight':
			return 1;
		default:
			return 0;
	}
}

export function FormatActivityValue(activity, value, timeFormatFunction = SecondsToHMMSS, sign = true) {
	let output = { value: 0, unit: '' }
	const v = sign ? value : Math.abs(value);
	switch (activity.type) {
		case 'time':
			output.value = timeFormatFunction(v);
			break;
		case 'weight':
			output.value = FormatNumber(v);
			output.unit = 'Kg';
			break;
		case 'counter':
		default:
			output.value = FormatNumber(v);
			output.unit = activity.unit;
			break;
	}
	return output;
}