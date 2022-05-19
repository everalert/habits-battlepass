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
			variations: 'kanji,vocab,sentence' 
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
		{
			id: 8,
			label: 'Drink Water',
			type: 'counter',
			unit: 'mL',
			isReportingIncremental: true,
			variations: '' 
		},
		{
			id: 9,
			label: 'Watch Japanese TV',
			type: 'counter',
			unit: 'ep',
			isReportingIncremental: true,
			variations: 'anime,live-action' 
		},
		{
			id: 10,
			label: 'Make GIT Commit',
			type: 'counter',
			unit: '',
			isReportingIncremental: true,
			variations: '' 
		},
		{
			id: 11,
			label: 'SM64 Run Attempts Playtime',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: '16star,70star,120star'
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