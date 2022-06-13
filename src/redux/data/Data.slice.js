import { createSlice } from "@reduxjs/toolkit"
import DataReducers from "./Data.reducers";
import DataInitialState from "./Data.initialstate";


export const DataSlice = createSlice({
	name: 'Data',
	initialState: DataInitialState,
	reducers: DataReducers
})

export const { 
	replaceRecords,
	addSeason, editSeason, deleteSeason, applySeasonXP,
	addCategory, editCategory, deleteCategory,
	addGoal, editGoal, deleteGoal, applyGoalXP,
	addActivity, editActivity, deleteActivity,
	addChallenge, editChallenge, deleteChallenge, 
	addLog, editLog, deleteLog
} = DataSlice.actions


export default DataSlice.reducer