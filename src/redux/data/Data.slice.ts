import { createSlice } from "@reduxjs/toolkit"
import DataReducers from "./Data.reducers";
import DataInitialState from "./Data.initialstate";


export const DataSlice = createSlice({
	name: 'Data',
	initialState: DataInitialState,
	reducers: DataReducers
})

export const { 
	login, logout,
	replaceRecords, setActiveSeason,
	addSeason, addCategory, addGoal, addActivity, addChallenge, addLog,
	editSeason, editCategory, editGoal, editActivity, editChallenge, editLog,
	deleteSeason, deleteCategory, deleteGoal, deleteActivity, deleteChallenge, deleteLog,
	copySeason, copyCategory, copyGoal, copyActivity, copyChallenge, copyLog,
	applyGoalXP, applySeasonXP,
} = DataSlice.actions


export default DataSlice.reducer