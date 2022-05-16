import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	activities: [{
		id: 0,
		label: 'Category',
		format: '', // how the string is rendered
		variations: '' // csv
	}],
}

export const ActivitySlice = createSlice({
	name: 'Activity',
	initialState,
	reducers: {
		
	},
})

//export const {  } = ActivitySlice.actions

export default ActivitySlice.reducer