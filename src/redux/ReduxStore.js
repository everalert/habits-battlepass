import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./data/Data.slice";
import MetaReducer from "./meta/Meta.slice";
import asyncDispatch from "./middleware/asyncDispatch.middleware";
import logActionType from "./middleware/logActionType.middleware";


export const store = configureStore({
	reducer: {
		data: DataReducer,
		meta: MetaReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(asyncDispatch)
			// .concat(logActionType)
});