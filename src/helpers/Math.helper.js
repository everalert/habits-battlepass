export function GetCurrentUnixTimestamp() {
	return Math.floor(new Date().getTime()/1000)
}

export function SecondsToTimeObject(seconds) {
	return {
		d: Math.floor(seconds/86400),
		h: Math.floor(seconds%86400/3600),
		m: Math.floor(seconds%3600/60), 
		s: Math.floor(seconds%60),
		ms: seconds%1
	}
}

export function SecondsToHMMSS(seconds) {
	const {d, h, m, s} = SecondsToTimeObject(seconds)
	return `${String(d*24+h)}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

export function SecondsToMinutes(seconds) {
	const {d, h, m, s, ms} = SecondsToTimeObject(seconds)
	return d*1440+h*60+m+(s+ms)/60
}