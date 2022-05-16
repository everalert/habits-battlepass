import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	logs: [{
		activity: 0,
		datetime: 1652709600,
		value: 0,
		variation: ''
	}],
}

export const LogSlice = createSlice({
	name: 'Log',
	initialState,
	reducers: {
		
	},
})

// export const {  } = LogSlice.actions

export default LogSlice.reducer