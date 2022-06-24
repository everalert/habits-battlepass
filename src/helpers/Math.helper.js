export function GetCurrentUnixTimestamp() {
	return Math.floor(Date.now()/1000)
}

export function GetTimeString(timestamp, showSeconds = false) {
	const date = new Date();
	const str = (new Date(timestamp*1000-date.getTimezoneOffset()*60000))
		.toISOString()
		.replace(/[-TZ:.]+/g, '');
	return `${str.slice(0,8)}-${str.slice(8,12+(showSeconds?2:0))}`;
}

export function GetCurrentTimeString(showSeconds = false) {
	const date = new Date();
	return GetTimeString(date.getTime()/1000, showSeconds);
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

export function TimeObjectToSeconds(timeObj) {
	return timeObj.d*86400 + timeObj.h*3600 + timeObj.m*60 + timeObj.s + timeObj.ms/1000
}

export function SecondsToHMMSS(seconds) {
	const {d, h, m, s} = SecondsToTimeObject(seconds)
	return `${String(d*24+h)}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

export function SecondsToMinutes(seconds) {
	const {d, h, m, s, ms} = SecondsToTimeObject(seconds)
	return d*1440+h*60+m+(s+ms)/60
}

export function RoundN(number, n) {
	return parseFloat(number.toFixed(n))
}

export function FormatNumber(number, decimals = 0) {
	return number.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}

export function strPadZero(n, len, str = '0') {
	return n.toString().padStart(len, str);
}

export function strTruncToInt(n, len) {
	let newVal = n.toString().replace(/[^0-9]+/g,'')
	newVal = newVal.substring(Math.max(0,newVal.length-len), newVal.length);
	return newVal==='' ? 0 : parseInt(newVal);
}

export function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}

export function strToFloat(str) {
	let newAmount = `0${str}`.replace(/[^0-9\.]+/g, '').match(/([0-9]+\.)?[0-9]+/);
	return newAmount!==null ? parseFloat(newAmount) : 0;
}