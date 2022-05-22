import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice"

const initialState = {
	goals: [
		{
			id: 0,
			seasonId: 0,
			categoryId: 0,
			goalLagActivityId: 6, // body weight
			goalLagStartValue: 112.3,
			goalLagEndValue: 102.3,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 7, // gym sessions
			goalLeadActivityTarget: 39,
			goalNote: '',
			currentXP: 0,
			seasonXpRatio: 0.25
		},
		{
			id: 1,
			seasonId: 0,
			categoryId: 2,
			goalLagActivityId: 4, // number of known japanese words in anki (morphman)
			goalLagStartValue: 8594,
			goalLagEndValue: 9400,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 5, // japanese cards added to anki
			goalLeadActivityTarget: 910,
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
		{
			id: 2,
			seasonId: 0,
			categoryId: 1,
			goalLagActivityId: 2, // number of completed projects
			goalLagStartValue: 0,
			goalLagEndValue: 6,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 3, // hours of project development
			goalLeadActivityTarget: 180*3600,
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
		{
			id: 3,
			seasonId: 0,
			categoryId: 3,
			goalLagActivityId: 0, // sm64 16+70+120 pb total
			goalLagStartValue: 4.5*3600,
			goalLagEndValue: 3.0*3600,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 1, // sm64 practice playtime
			goalLeadActivityTarget: 180*3600,
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
	],
	base: {
		id: 0,
		seasonId: 0,
		categoryId: 0,
		goalLagActivityId: 0,
		goalLagStartValue: 0,
		goalLagEndValue: 0,
		goalLagProjectionCurve: 'linear',
		goalLeadActivityId: 0,
		goalLeadActivityTarget: 0,
		goalNote: '',
		currentXP: 0 ,
		seasonXpRatio: 1
	}
}

export const GoalSlice = createSlice({
	name: 'Goal',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.goals = action.payload.goals;
		})
	}
})

// export const {  } = GoalSlice.actions

export default GoalSlice.reducer