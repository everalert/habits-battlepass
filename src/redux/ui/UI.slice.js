import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	renderTick: 0
}


const reducers = {
	incRenderTick: (state) => {
		state.renderTick = state.renderTick+1;
	}
}


export const UISlice = createSlice({
	name: 'UI',
	initialState,
	reducers
})

export const { incRenderTick } = UISlice.actions


export default UISlice.reducer