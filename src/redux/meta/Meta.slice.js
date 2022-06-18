import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	renderTick: 0
}


const reducers = {
	incRenderTick: (state) => {
		state.renderTick = state.renderTick+1;
	}
}


export const MetaSlice = createSlice({
	name: 'Meta',
	initialState,
	reducers
})

export const { incRenderTick } = MetaSlice.actions


export default MetaSlice.reducer