import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";


export default {
	login: null,
	season: {
		active: 0,
		opts: {},
		seasons: [],
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
		opts: {},
		categories: [],
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
		goals: [],
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
		activities: [],
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
		challenges: [],
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
		logs: [],
		base: {
			id: 0,
			activityId: -1,
			timestamp: GetCurrentUnixTimestamp(),
			value: 0,
			variation: ''
		}
	}
};