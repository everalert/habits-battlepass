export function GetCurrentUnixTimestamp() {
	return Math.floor(new Date().getTime()/1000)
}