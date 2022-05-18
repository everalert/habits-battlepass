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