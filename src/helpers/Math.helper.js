export function GetCurrentUnixTimestamp() {
	return Math.floor(new Date().getTime()/1000)
}

export function SecondsToHMMSS(seconds) {
	const h = Math.floor(seconds/3600)
	const m = Math.floor(seconds%3600/60)
	const s = seconds%3600%60
	return `${String(h)}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}