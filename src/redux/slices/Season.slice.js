import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice"
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

const initialState = {
	active: 0,
	opts: {

	},
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
		start: GetCurrentUnixTimestamp(),
		length: 91*86400,
		title: 'Season',
		description: '',
		reward1Label: '',
		reward1Claimed: false,
		reward1Level: 25,
		reward2Label: '',
		reward2Claimed: false,
		reward2Level: 50,
		reward3Label: '',
		reward3Claimed: false,
		reward3Level: 100,
		reward4Label: '',
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
		deleteSeason: (state, action) => {
			state.seasons = state.seasons.filter(s => s.id !== action.payload.id)
		},
		setLengthInDays: (state, action) => {
			state.seasons[action.payload.seasonId].length = 86400 * action.payload.days
		},
		applySeasonXP: (state, action) => {
			const i = state.seasons.findIndex(s => s.id === action.payload.id)
			if (i >= 0) {
				state.seasons[i].currentXP += action.payload.xp;
				state.seasons[i].currentLevel = Math.floor(state.seasons[i].currentXP/state.seasons[i].levelXP);
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.seasons = action.payload.seasons;
		})
	}
})

export const { addSeason, editSeason, deleteSeason, setLengthInDays, applySeasonXP } = SeasonSlice.actions

export default SeasonSlice.reducer