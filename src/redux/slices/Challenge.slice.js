import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

const initialState = {
	opts: {
		period: ['daily','weekly'],
		labelInsert: ['{UNIT}','{ACTIVITY}'],
	},
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
	base: {
		id: 0,
		goalId: -1,
		taskLabel: '{UNIT} of {ACTIVITY}',
		taskActivityId: -1,
		taskAmount: 0,
		taskVariation: '',
		taskXP: 0,
		period: 'weekly',
		isTemplate: true
	}
}

export const ChallengeSlice = createSlice({
	name: 'Challenge',
	initialState,
	reducers: {
		addChallenge: (state, action) => {
			const newChallenge = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.challenges.push(newChallenge);
		},
		editChallenge: (state, action) => {
			const i = state.challenges.findIndex(l => l.id === action.payload.id);
			const newChallenge = Object.assign(
				{ ...state.challenges[i] },
				action.payload.update
			);
			state.challenges[i] = newChallenge;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.challenges = action.payload.challenges;
		})
	}
})

export const { addChallenge, editChallenge } = ChallengeSlice.actions

export default ChallengeSlice.reducer