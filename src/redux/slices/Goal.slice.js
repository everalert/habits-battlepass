import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	goals: [{
		id: 0,
		seasonId: 0,
		categoryId: 0,
		goalLagActivityId: 0,
		goalLagStartValue: 0,
		goalLagEndValue: 0,
		goalLeadActivityId: 0,
		goalLeadActivityTarget: 0,
		goalNote: '',
		currentXP: 0
	}],
}

export const GoalSlice = createSlice({
	name: 'Goal',
	initialState,
	reducers: {
		
	},
})

// export const {  } = GoalSlice.actions

export default GoalSlice.reducer