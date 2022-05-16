import { configureStore } from "@reduxjs/toolkit";
import SeasonReducer from './slices/Season.slice'
import CategoryReducer from './slices/Category.slice'
import GoalReducer from './slices/Goal.slice'
import ChallengeReducer from './slices/Challenge.slice'
import ActivityReducer from './slices/Activity.slice'
import LogReducer from './slices/Log.slice'

export const store = configureStore({
	reducer: {
		season: SeasonReducer,
		category: CategoryReducer,
		goal: GoalReducer,
		challenge: ChallengeReducer,
		activity: ActivityReducer,
		log: LogReducer
	},
});