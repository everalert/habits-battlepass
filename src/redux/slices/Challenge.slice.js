import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	challenges: [
		{
			id: 0,
			goalId: 0,
			taskLabel: 'do 50 things',
			taskActivityId: 0,
			taskXP: 0,
			isWeekly: false,
			isTemplate: false
		},
	], 
}

export const ChallengeSlice = createSlice({
	name: 'Challenge',
	initialState,
	reducers: {
		
	},
})

// export const {  } = ChallengeSlice.actions

export default ChallengeSlice.reducer