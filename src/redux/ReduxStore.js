import { configureStore } from "@reduxjs/toolkit";
import asyncDispatch from "./middleware/asyncDispatch.middleware";
import ActivityReducer from './slices/Activity.slice';
import CategoryReducer from './slices/Category.slice';
import ChallengeReducer from './slices/Challenge.slice';
import GoalReducer from './slices/Goal.slice';
import LogReducer from './slices/Log.slice';
import SeasonReducer from './slices/Season.slice';


export const store = configureStore({
	reducer: {
		season: SeasonReducer,
		category: CategoryReducer,
		goal: GoalReducer,
		challenge: ChallengeReducer,
		activity: ActivityReducer,
		log: LogReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncDispatch)
});