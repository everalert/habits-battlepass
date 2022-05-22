import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	
}

export const ManagerSlice = createSlice({
	name: 'Manager',
	initialState,
	reducers: {
		replaceRecords: (state, action) => {  }	
	},
})

export const { replaceRecords } = ManagerSlice.actions

export default ManagerSlice.reducer