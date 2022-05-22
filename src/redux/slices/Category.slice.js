import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice";

const initialState = {
	categories: [
		{
			id: 0,
			name: 'Health & Fitness',
			icon: '💪',
			description: ''
		},
		{
			id: 1,
			name: 'Wealth',
			icon: '🖥️',
			description: ''
		},
		{
			id: 2,
			name: '日本語',
			icon: '💬',
			description: ''
		},
		{
			id: 3,
			name: 'Gaming',
			icon: '🎮',
			description: ''
		},
	],
	base: {
		id: 0,
		name: '',
		icon: '',
		description: ''
	}
}

export const CategorySlice = createSlice({
	name: 'Category',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.categories = action.payload.categories;
		})
	}
})

//export const {  } = CategorySlice.actions

export default CategorySlice.reducer