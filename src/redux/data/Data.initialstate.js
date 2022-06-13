import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";


export default {
	season: {
		active: 0,
		opts: {},
		seasons: [
			{
				id: 0,
				start: 1652709600,
				length: 91*86400,
				title: 'Season 00',
				description: 'Season 00 Description',
				reward1Label: 'reward1',
				reward1Claimed: false,
				reward1Level: 25,
				reward2Label: 'reward2',
				reward2Claimed: false,
				reward2Level: 50,
				reward3Label: 'reward3',
				reward3Claimed: false,
				reward3Level: 100,
				reward4Label: 'reward4',
				reward4Claimed: false,
				reward4Level: 120,
				levelMax: 130,
				levelXP: 10000,
				color1: '#000000',
				color2: '#FFFFFF',
				currentXP: 0,
				currentLevel: 0
			}
		],
		base: {
			id: 0,
			start: GetCurrentUnixTimestamp(),
			length: 91*86400,
			title: 'Season',
			description: '',
			reward1Label: '',
			reward1Claimed: false,
			reward1Level: 25,
			reward2Label: '',
			reward2Claimed: false,
			reward2Level: 50,
			reward3Label: '',
			reward3Claimed: false,
			reward3Level: 100,
			reward4Label: '',
			reward4Claimed: false,
			reward4Level: 120,
			levelMax: 130,
			levelXP: 10000,
			color1: '#000000',
			color2: '#FFFFFF',
			currentXP: 0,
			currentLevel: 0
		}
	},
	category: {
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
	},
	goal: {
		opts: {
			projectionCurve: ['linear']
		},
		goals: [
			{
				id: 0,
				seasonId: 0,
				categoryId: 0,
				goalLagActivityId: 6, // body weight
				goalLagActivityVariation: '',
				goalLagStartValue: 112.3,
				goalLagEndValue: 102.3,
				goalLagProjectionCurve: 'linear',
				goalLeadActivityId: 7, // gym sessions
				goalLeadActivityTarget: 39,
				goalLeadActivityVariation: '',
				goalNote: '',
				currentXP: 0,
				seasonXpRatio: 0.25
			},
			{
				id: 1,
				seasonId: 0,
				categoryId: 2,
				goalLagActivityId: 4, // number of known japanese words in anki (morphman)
				goalLagActivityVariation: '',
				goalLagStartValue: 8594,
				goalLagEndValue: 9400,
				goalLagProjectionCurve: 'linear',
				goalLeadActivityId: 5, // japanese cards added to anki
				goalLeadActivityTarget: 910,
				goalLeadActivityVariation: '',
				goalNote: '',
				currentXP: 0 ,
				seasonXpRatio: 0.25
			},
			{
				id: 2,
				seasonId: 0,
				categoryId: 1,
				goalLagActivityId: 2, // number of completed projects
				goalLagActivityVariation: '',
				goalLagStartValue: 0,
				goalLagEndValue: 6,
				goalLagProjectionCurve: 'linear',
				goalLeadActivityId: 3, // hours of project development
				goalLeadActivityTarget: 180*3600,
				goalLeadActivityVariation: '',
				goalNote: '',
				currentXP: 0 ,
				seasonXpRatio: 0.25
			},
			{
				id: 3,
				seasonId: 0,
				categoryId: 3,
				goalLagActivityId: 0, // sm64 16+70+120 pb total
				goalLagActivityVariation: '',
				goalLagStartValue: 4.5*3600,
				goalLagEndValue: 3.0*3600,
				goalLagProjectionCurve: 'linear',
				goalLeadActivityId: 1, // sm64 practice playtime
				goalLeadActivityTarget: 180*3600,
				goalLeadActivityVariation: '',
				goalNote: '',
				currentXP: 0 ,
				seasonXpRatio: 0.25
			},
		],
		base: {
			id: 0,
			seasonId: -1,
			categoryId: -1,
			goalLagActivityId: -1,
			goalLagActivityVariation: '',
			goalLagStartValue: 0,
			goalLagEndValue: 0,
			goalLagProjectionCurve: 'linear',
			goalLeadActivityId: -1,
			goalLeadActivityTarget: 0,
			goalLeadActivityVariation: '',
			goalNote: '',
			currentXP: 0 ,
			seasonXpRatio: 1
		}
	},
	activity: {
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
	},
	challenge: {
		opts: {
			period: ['daily','weekly'],
			labelInsert: ['{UNIT}','{ACTIVITY}'],
		},
		challenges: [
			{
				id: 0,
				goalId: 0,
				taskLabel: 'drink {UNIT} of water',
				taskActivityId: 8,
				taskAmount: 3000,
				taskVariation: '',
				taskXP: 1000,
				period: 'daily',
				isTemplate: true
			},
			{
				id: 1,
				goalId: 0,
				taskLabel: '{UNIT} gym sessions',
				taskActivityId: 7,
				taskAmount: 3,
				taskVariation: '',
				taskXP: 8000,
				period: 'weekly',
				isTemplate: true
			},
			
			{
				id: 2,
				goalId: 1,
				taskLabel: 'Add {UNIT} Japanese Anki Cards',
				taskActivityId: 5,
				taskAmount: 10,
				taskVariation: '',
				taskXP: 1000,
				period: 'daily',
				isTemplate: true
			},
			{
				id: 3,
				goalId: 1,
				taskLabel: 'Watch {UNIT} of anime',
				taskActivityId: 9,
				taskAmount: 7,
				taskVariation: 'anime',
				taskXP: 8000,
				period: 'weekly',
				isTemplate: true
			},
			
			{
				id: 4,
				goalId: 2,
				taskLabel: '{UNIT} GIT Commits',
				taskActivityId: 10,
				taskAmount: 3,
				taskVariation: '',
				taskXP: 1000,
				period: 'daily',
				isTemplate: true
			},
			{
				id: 5,
				goalId: 2,
				taskLabel: '{UNIT} working on projects',
				taskActivityId: 3,
				taskAmount: 50400,
				taskVariation: '',
				taskXP: 8000,
				period: 'weekly',
				isTemplate: true
			},
			
			{
				id: 6,
				goalId: 3,
				taskLabel: '{UNIT} of SM64 practice',
				taskActivityId: 1,
				taskAmount: 7200,
				taskVariation: '',
				taskXP: 1000,
				period: 'daily',
				isTemplate: true
			},
			{
				id: 7,
				goalId: 3,
				taskLabel: '{UNIT} of SM64 run attempts',
				taskActivityId: 11,
				taskAmount: 14400,
				taskVariation: '',
				taskXP: 8000,
				period: 'weekly',
				isTemplate: true
			},
		],
		base: {
			id: 0,
			goalId: -1,
			taskLabel: '{UNIT} of {ACTIVITY}',
			taskActivityId: -1,
			taskAmount: 0,
			taskVariation: '',
			taskXP: 0,
			period: 'weekly',
			isTemplate: true
		}
	},
	log: {
		logs: [
			{
				id: 0,
				activityId: 0,
				timestamp: 1652709600,
				value: 16181,
				variation: ''
			},
			{
				id: 1,
				activityId: 4,
				timestamp: 1652709600,
				value: 15116,
				variation: ''
			},
			{
				id: 2,
				activityId: 6,
				timestamp: 1652709600,
				value: 112.3,
				variation: ''
			},
			{
				id: 3,
				activityId: 5,
				timestamp: 1653125233,
				value: 20,
				variation: ''
			},
			{
				id: 4,
				activityId: 9,
				timestamp: 1653125233,
				value: 5,
				variation: ''
			},
		],
		base: {
			id: 0,
			activityId: -1,
			timestamp: GetCurrentUnixTimestamp(),
			value: 0,
			variation: ''
		}
	}
};