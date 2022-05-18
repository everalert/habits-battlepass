import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	activities: [
		{
			id: 0,
			label: 'SM64 Personal Best Total (16+70+120)',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: ''
		},
		{
			id: 1,
			label: 'SM64 Practice Playtime',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: 'star,level,segment'
		},
		{
			id: 2,
			label: 'Completed Personal Projects',
			type: 'counter', 
			unit: '',
			isReportingIncremental: true,
			variations: 'software,hardware' 
		},
		{
			id: 3,
			label: 'Personal Project Development Time',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: 'software,hardware' 
		},
		{
			id: 4,
			label: 'Known Japanese Words in Anki',
			type: 'counter', 
			unit: '語',
			isReportingIncremental: true,
			variations: '' 
		},
		{
			id: 5,
			label: 'Japanese Cards Added to Anki',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: 'software,hardware' 
		},
		{
			id: 6,
			label: 'Body Weight',
			type: 'weight', 
			unit: '',
			isReportingIncremental: true,
			variations: '' 
		},
		{
			id: 7,
			label: 'Gym Sessions',
			type: 'counter',
			unit: '',
			isReportingIncremental: true,
			variations: 'weightlifting,cardio' 
		},
],
}

export const ActivitySlice = createSlice({
	name: 'Activity',
	initialState,
	reducers: {
		
	},
})

//export const {  } = ActivitySlice.actions

export default ActivitySlice.reducer