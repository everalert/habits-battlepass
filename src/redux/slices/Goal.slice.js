import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice"
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { applySeasonXP } from "./Season.slice";

const initialState = {
	opts: {
		projectionCurve: ['linear']
	},
	goals: [
		{
			id: 0,
			seasonId: 0,
			categoryId: 0,
			goalLagActivityId: 6, // body weight
			goalLagActivityVariation: '',
			goalLagStartValue: 112.3,
			goalLagEndValue: 102.3,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 7, // gym sessions
			goalLeadActivityTarget: 39,
			goalLeadActivityVariation: '',
			goalNote: '',
			currentXP: 0,
			seasonXpRatio: 0.25
		},
		{
			id: 1,
			seasonId: 0,
			categoryId: 2,
			goalLagActivityId: 4, // number of known japanese words in anki (morphman)
			goalLagActivityVariation: '',
			goalLagStartValue: 8594,
			goalLagEndValue: 9400,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 5, // japanese cards added to anki
			goalLeadActivityTarget: 910,
			goalLeadActivityVariation: '',
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
		{
			id: 2,
			seasonId: 0,
			categoryId: 1,
			goalLagActivityId: 2, // number of completed projects
			goalLagActivityVariation: '',
			goalLagStartValue: 0,
			goalLagEndValue: 6,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 3, // hours of project development
			goalLeadActivityTarget: 180*3600,
			goalLeadActivityVariation: '',
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
		{
			id: 3,
			seasonId: 0,
			categoryId: 3,
			goalLagActivityId: 0, // sm64 16+70+120 pb total
			goalLagActivityVariation: '',
			goalLagStartValue: 4.5*3600,
			goalLagEndValue: 3.0*3600,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: 1, // sm64 practice playtime
			goalLeadActivityTarget: 180*3600,
			goalLeadActivityVariation: '',
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 0.25
		},
	],
	base: {
		id: 0,
		seasonId: -1,
		categoryId: -1,
		goalLagActivityId: -1,
		goalLagActivityVariation: '',
		goalLagStartValue: 0,
		goalLagEndValue: 0,
		goalLagProjectionCurve: 'linear',
		goalLeadActivityId: -1,
		goalLeadActivityTarget: 0,
		goalLeadActivityVariation: '',
		goalNote: '',
		currentXP: 0 ,
		seasonXpRatio: 1
	}
}

export const GoalSlice = createSlice({
	name: 'Goal',
	initialState,
	reducers: {
		addGoal: (state, action) => {
			const newGoal = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.goals.push(newGoal);
		},
		editGoal: (state, action) => {
			const i = state.goals.findIndex(l => l.id === action.payload.id);
			const newGoal = Object.assign(
				{ ...state.goals[i] },
				action.payload.update
			);
			state.goals[i] = newGoal;
		},
		deleteGoal: (state, action) => {
			state.goals = state.goals.filter(g => g.id !== action.payload.id)
		},
		applyGoalXP: (state, action) => {
			const i = state.goals.findIndex(g => g.id === action.payload.id)
			if (i >= 0) {
				state.goals[i].currentXP += action.payload.xp;
				action.asyncDispatch(applySeasonXP({
					id: state.goals[i].seasonId,
					xp: action.payload.xp
				}))
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.goals = action.payload.goals;
		})
	}
})

export const { addGoal, editGoal, deleteGoal, applyGoalXP } = GoalSlice.actions

export default GoalSlice.reducer