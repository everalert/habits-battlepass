import { createAction, createSlice } from "@reduxjs/toolkit"
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { replaceRecords } from "./Manager.slice";

const initialState = {
	logs: [
		{
			id: 0,
			activityId: 0,
			timestamp: 1652709600,
			value: 16181,
			variation: ''
		},
		{
			id: 1,
			activityId: 4,
			timestamp: 1652709600,
			value: 15116,
			variation: ''
		},
		{
			id: 2,
			activityId: 6,
			timestamp: 1652709600,
			value: 112.3,
			variation: ''
		},
		{
			id: 3,
			activityId: 5,
			timestamp: 1653125233,
			value: 20,
			variation: ''
		},
		{
			id: 4,
			activityId: 9,
			timestamp: 1653125233,
			value: 5,
			variation: ''
		},
	],
	base: {
		id: 0,
		activityId: -1,
		timestamp: 0,
		value: 0,
		variation: ''
	}
}

export const LogSlice = createSlice({
	name: 'Log',
	initialState,
	reducers: {
		addLog: (state, action) => {
			const newLog = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.logs.push(newLog);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.logs = action.payload.logs;
		})
	}
})

export const { addLog } = LogSlice.actions

export default LogSlice.reducer