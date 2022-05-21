import { createSlice } from "@reduxjs/toolkit"

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
			value: 111.6,
			variation: ''
		},
	],
}

export const LogSlice = createSlice({
	name: 'Log',
	initialState,
	reducers: {
		
	},
})

// export const {  } = LogSlice.actions

export default LogSlice.reducer