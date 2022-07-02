import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./data/Data.slice";
import UIReducer from "./ui/UI.slice";
import asyncDispatch from "./middleware/asyncDispatch.middleware";
import logActionType from "./middleware/logActionType.middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
	reducer: {
		data: DataReducer,
		ui: UIReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(asyncDispatch)
			// .concat(logActionType)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch