import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	categories: [{
		id: 0,
		name: 'Category',
		icon: '語',
		description: 'Japanese'
	}],
}

export const CategorySlice = createSlice({
	name: 'Category',
	initialState,
	reducers: {

	},
})

//export const {  } = CategorySlice.actions

export default CategorySlice.reducer