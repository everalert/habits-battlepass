import { createSlice } from "@reduxjs/toolkit"

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
}

export const CategorySlice = createSlice({
	name: 'Category',
	initialState,
	reducers: {

	},
})

//export const {  } = CategorySlice.actions

export default CategorySlice.reducer