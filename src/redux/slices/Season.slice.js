import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	active: 0,
	seasons: [{
		id: 0,
		start: 1652709600, // unix timestamp
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
		currentXP: 0,
		currentLevel: 0
	}]
}

export const SeasonSlice = createSlice({
	name: 'Season',
	initialState,
	reducers: {
		setLengthInDays: (state, action) => {
			state.seasons[action.payload.seasonId].length = 86400 * action.payload.days
		}
	},
})

export const { setLengthInDays } = SeasonSlice.actions

export default SeasonSlice.reducer