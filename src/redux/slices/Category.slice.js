import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

const initialState = {
	opts: {

	},
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
		addCategory: (state, action) => {
			const newCategory = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.categories.push(newCategory);
		},
		editCategory: (state, action) => {
			const i = state.categories.findIndex(l => l.id === action.payload.id);
			const newCategory = Object.assign(
				{ ...state.categories[i] },
				action.payload.update
			);
			state.categories[i] = newCategory;
		},
		deleteCategory: (state, action) => {
			state.categories = state.categories.filter(c => c.id !== action.payload.id)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.categories = action.payload.categories;
		})
	}
})

export const { addCategory, editCategory, deleteCategory } = CategorySlice.actions

export default CategorySlice.reducer