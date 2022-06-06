import { createSlice } from "@reduxjs/toolkit"
import { replaceRecords } from "./Manager.slice";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";

const initialState = {
	opts: {
		type: ['counter', 'time', 'weight']
	},
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
	base: {
		id: 0,
		label: '',
		type: 'counter', 
		unit: '',
		isReportingIncremental: true,
		variations: '',
		note: ''
	}
}

export const ActivitySlice = createSlice({
	name: 'Activity',
	initialState,
	reducers: {
		addActivity: (state, action) => {
			const newActivity = Object.assign(
				{ ...state.base },
				{ ...action.payload },
				{ id: GetCurrentUnixTimestamp() }
			)
			state.activities.push(newActivity);
		},
		editActivity: (state, action) => {
			const i = state.activities.findIndex(l => l.id === action.payload.id);
			const newActivity = Object.assign(
				{ ...state.activities[i] },
				action.payload.update
			);
			state.activities[i] = newActivity;
		},
		deleteActivity: (state, action) => {
			state.activities = state.activities.filter(a => a.id !== action.payload.id)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(replaceRecords, (state, action) => {
			state.activities = action.payload.activities;
		})
	}
})

export const { addActivity, editActivity, deleteActivity } = ActivitySlice.actions

export default ActivitySlice.reducer