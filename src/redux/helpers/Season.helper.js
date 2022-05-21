import { useSelector } from "react-redux"
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper"

export function GetSeasonById(id) {
	return useSelector((state) => state.season.seasons.find(s => s.id === id))
}

export function GetPeriodOfSeason(season, periodInSeconds) {
	const timeNow = GetCurrentUnixTimestamp()
	const periodNum = Math.floor((timeNow-season.start)/periodInSeconds)
	const periodStart = season.start+periodNum*periodInSeconds
	const periodEnd = periodStart+periodInSeconds
	return { no: (periodNum+1), start: periodStart, end: periodEnd }
}

export function GetDayOfSeason(season) {
	return GetPeriodOfSeason(season, 86400);
}

export function GetWeekOfSeason(season) {
	return GetPeriodOfSeason(season, 604800);
}

export function GetSeasonProgressRatioAtTime(season, unixTimestamp) {
	const { start, length } = season
	return (unixTimestamp-start)/(length)
}

export function GetSeasonProgressRatio(season) {
	return GetSeasonProgressRatioAtTime(season, GetCurrentUnixTimestamp())
}

export function GetSeasonSuccessXp(season) {
	// TODO: make system for dynamically defining season non-bonus "success" level
	return season.reward3Level*season.levelXP
}