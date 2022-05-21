import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	activities: [
		{
			id: 0,
			label: 'SM64 Personal Best Total (16+70+120)',
			type: 'time', 
			unit: '',
			isReportingIncremental: false,
			variations: '',
			note: ''
		},
		{
			id: 1,
			label: 'SM64 Practice Playtime',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: 'star,level,segment',
			note: ''
		},
		{
			id: 2,
			label: 'Completed Personal Projects',
			type: 'counter', 
			unit: '',
			isReportingIncremental: true,
			variations: 'software,hardware' ,
			note: ''
		},
		{
			id: 3,
			label: 'Personal Project Development Time',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: 'software,hardware' ,
			note: ''
		},
		{
			id: 4,
			label: 'Estimated Known Japanese Words',
			type: 'counter', 
			unit: '語',
			isReportingIncremental: false,
			variations: '',
			note: 'https://glenn-sun.github.io/japanese-vocab-test/'
		},
		{
			id: 5,
			label: 'Japanese Cards Added to Anki',
			type: 'counter', 
			unit: '',
			isReportingIncremental: true,
			variations: 'kanji,vocab,sentence' ,
			note: ''
		},
		{
			id: 6,
			label: 'Body Weight',
			type: 'weight', 
			unit: '',
			isReportingIncremental: false,
			variations: '' ,
			note: ''
		},
		{
			id: 7,
			label: 'Gym Sessions',
			type: 'counter',
			unit: '',
			isReportingIncremental: true,
			variations: 'weightlifting,cardio' ,
			note: ''
		},
		{
			id: 8,
			label: 'Drink Water',
			type: 'counter',
			unit: 'mL',
			isReportingIncremental: true,
			variations: '' ,
			note: ''
		},
		{
			id: 9,
			label: 'Watch Japanese TV',
			type: 'counter',
			unit: 'ep',
			isReportingIncremental: true,
			variations: 'anime,live-action' ,
			note: ''
		},
		{
			id: 10,
			label: 'Make GIT Commit',
			type: 'counter',
			unit: '',
			isReportingIncremental: true,
			variations: '' ,
			note: ''
		},
		{
			id: 11,
			label: 'SM64 Run Attempts Playtime',
			type: 'time', 
			unit: '',
			isReportingIncremental: true,
			variations: '16star,70star,120star',
			note: ''
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