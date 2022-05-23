import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice"
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

const initialState = {
	active: 0,
	seasons: [
		{
			id: 0,
			start: 1652709600,
			length: 91*86400,
			title: 'Season 00',
			description: 'Season 00 Description',
			reward1Label: 'reward1',
			reward1Claimed: false,
			reward1Level: 25,
			reward2Label: 'reward2',
			reward2Claimed: false,
			reward2Level: 50,
			reward3Label: 'reward3',
			reward3Claimed: false,
			reward3Level: 100,
			reward4Label: 'reward4',
			reward4Claimed: false,
			reward4Level: 120,
			levelMax: 130,
			levelXP: 10000,
			color1: '#000000',
			color2: '#FFFFFF',
			currentXP: 11500,
			currentLevel: 10
		}
	],
	base: {
		id: 0,
		start: 0, // unix timestamp
		length: 91*86400,
		title: 'Season',
		description: 'Description',
		reward1Label: 'reward1',
		reward1Claimed: false,
		reward1Level: 25,
		reward2Label: 'reward2',
		reward2Claimed: false,
		reward2Level: 50,
		reward3Label: 'reward3',
		reward3Claimed: false,
		reward3Level: 100,
		reward4Label: 'reward4',
		reward4Claimed: false,
		reward4Level: 120,
		levelMax: 130,
		levelXP: 10000,
		color1: '#000000',
		color2: '#FFFFFF',
		currentXP: 0,
		currentLevel: 0
	}
}

export const SeasonSlice = createSlice({
	name: 'Season',
	initialState,
	reducers: {
		addSeason: (state, action) => {
			const newSeason = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.seasons.push(newSeason);
		},
		editSeason: (state, action) => {
			const i = state.seasons.findIndex(l => l.id === action.payload.id);
			const newSeason = Object.assign(
				{ ...state.seasons[i] },
				action.payload.update
			);
			state.seasons[i] = newSeason;
		},
		setLengthInDays: (state, action) => {
			state.seasons[action.payload.seasonId].length = 86400 * action.payload.days
		}
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.seasons = action.payload.seasons;
		})
	}
})

export const { addSeason, editSeason, setLengthInDays } = SeasonSlice.actions

export default SeasonSlice.reducer