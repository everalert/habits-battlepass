import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	challenges: [
		{
			id: 0,
			goalId: 0,
			taskLabel: 'drink {UNIT} of water',
			taskActivityId: 8,
			taskAmount: 3000,
			taskVariation: '',
			taskXP: 1000,
			period: 'daily',
			isTemplate: true
		},
		{
			id: 1,
			goalId: 0,
			taskLabel: '{UNIT} gym sessions',
			taskActivityId: 7,
			taskAmount: 3,
			taskVariation: '',
			taskXP: 8000,
			period: 'weekly',
			isTemplate: true
		},
		
		{
			id: 2,
			goalId: 1,
			taskLabel: 'Add {UNIT} Japanese Anki Cards',
			taskActivityId: 5,
			taskAmount: 10,
			taskVariation: '',
			taskXP: 1000,
			period: 'daily',
			isTemplate: true
		},
		{
			id: 3,
			goalId: 1,
			taskLabel: 'Watch {UNIT} of anime',
			taskActivityId: 9,
			taskAmount: 7,
			taskVariation: 'anime',
			taskXP: 8000,
			period: 'weekly',
			isTemplate: true
		},
		
		{
			id: 4,
			goalId: 2,
			taskLabel: '{UNIT} GIT Commits',
			taskActivityId: 10,
			taskAmount: 3,
			taskVariation: '',
			taskXP: 1000,
			period: 'daily',
			isTemplate: true
		},
		{
			id: 5,
			goalId: 2,
			taskLabel: '{UNIT} working on projects',
			taskActivityId: 3,
			taskAmount: 50400,
			taskVariation: '',
			taskXP: 8000,
			period: 'weekly',
			isTemplate: true
		},
		
		{
			id: 6,
			goalId: 3,
			taskLabel: '{UNIT} of SM64 practice',
			taskActivityId: 1,
			taskAmount: 7200,
			taskVariation: '',
			taskXP: 1000,
			period: 'daily',
			isTemplate: true
		},
		{
			id: 7,
			goalId: 3,
			taskLabel: '{UNIT} of SM64 run attempts',
			taskActivityId: 11,
			taskAmount: 14400,
			taskVariation: '',
			taskXP: 8000,
			period: 'weekly',
			isTemplate: true
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