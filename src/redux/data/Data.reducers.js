import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { IsChallengeOfLog } from "../helpers/Challenge.helper";
import { getChallengeEndValueAtTimestamp, getListsFromDataState } from "./Data.helpers";
import { applyGoalXP, applySeasonXP } from "./Data.slice";


function makeCopyString(str) {
	return `Copy of ${str}`
}

function updateChallengeProgress(state, { logDelta, logActivityId, logVariation, logTimestamp, logs }, asyncDispatch) {
	const c = state.challenge.challenges.filter(c => c.taskActivityId === logActivityId && IsChallengeOfLog(logVariation, c.taskVariation));
	c.forEach(c => {
		const { id: goalId, seasonId } = state.goal.goals.find(g => g.id === c.goalId);
		const endValue = getChallengeEndValueAtTimestamp(c, logTimestamp, getListsFromDataState(state));
		const startValue = endValue-logDelta;
		if (endValue >= c.taskAmount && startValue < c.taskAmount) {
			asyncDispatch(applyGoalXP({ id: goalId, xp: c.taskXP }));
			asyncDispatch(applySeasonXP({ id: seasonId, xp: c.taskXP }));
		}
		if (endValue < c.taskAmount && startValue >= c.taskAmount) {
			asyncDispatch(applyGoalXP({ id: goalId, xp: -c.taskXP }));
			asyncDispatch(applySeasonXP({ id: seasonId, xp: -c.taskXP }));
		}
	});
}


export default {

	replaceRecords: (state, action) => {
		state.season.seasons = action.payload.seasons;
		state.category.categories = action.payload.categories;
		state.goal.goals = action.payload.goals;
		state.activity.activities = action.payload.activities;
		state.challenge.challenges = action.payload.challenges;
		state.log.logs = action.payload.logs;
	},
	setActiveSeason: (state, action) => {
		state.season.active	= state.season.seasons.findIndex(s => s.id === action.payload.id);
	},


	addSeason: (state, action) => {
		const newSeason = Object.assign(
			{ ...state.season.base },
			{ ...action.payload },
			{ id: GetCurrentUnixTimestamp() }
		)
		state.season.seasons.push(newSeason);
	},
	addCategory: (state, action) => {
		const newCategory = Object.assign(
			{ ...state.category.base },
			{ ...action.payload },
			{ id: GetCurrentUnixTimestamp() }
		)
		state.category.categories.push(newCategory);
	},
	addGoal: (state, action) => {
		const newGoal = Object.assign(
			{ ...state.goal.base },
			{ ...action.payload },
			{ id: GetCurrentUnixTimestamp() }
		)
		state.goal.goals.push(newGoal);
	},
	addActivity: (state, action) => {
		const newActivity = Object.assign(
			{ ...state.activity.base },
			{ ...action.payload },
			{ id: GetCurrentUnixTimestamp() }
		)
		state.activity.activities.push(newActivity);
	},
	addChallenge: (state, action) => {
		const newChallenge = Object.assign(
			{ ...state.challenge.base },
			{ ...action.payload },
			{ id: GetCurrentUnixTimestamp() }
		)
		state.challenge.challenges.push(newChallenge);
	},
	addLog: (state, action) => {
		const newLog = Object.assign(
			{ ...state.log.base },
			action.payload,
			{ id: GetCurrentUnixTimestamp() }
		)
		state.log.logs.push(newLog);
		updateChallengeProgress(state, {
			logDelta: newLog.value,
			logActivityId: newLog.activityId,
			logVariation: newLog.variation,
			logTimestamp: newLog.timestamp,
			logs: state.log.logs.filter(l => l.activityId === newLog.activityId)
		}, action.asyncDispatch);
	},
	
	
	editSeason: (state, action) => {
		const i = state.season.seasons.findIndex(l => l.id === action.payload.id);
		const newSeason = Object.assign(
			{ ...state.season.seasons[i] },
			action.payload.update
		);
		state.season.seasons[i] = newSeason;
	},
	editCategory: (state, action) => {
		const i = state.category.categories.findIndex(l => l.id === action.payload.id);
		const newCategory = Object.assign(
			{ ...state.category.categories[i] },
			action.payload.update
		);
		state.category.categories[i] = newCategory;
	},
	editGoal: (state, action) => {
		const i = state.goal.goals.findIndex(l => l.id === action.payload.id);
		const newGoal = Object.assign(
			{ ...state.goal.goals[i] },
			action.payload.update
		);
		state.goal.goals[i] = newGoal;
	},
	editActivity: (state, action) => {
		const i = state.activity.activities.findIndex(l => l.id === action.payload.id);
		const newActivity = Object.assign(
			{ ...state.activity.activities[i] },
			action.payload.update
		);
		state.activity.activities[i] = newActivity;
	},
	editChallenge: (state, action) => {
		const i = state.challenge.challenges.findIndex(l => l.id === action.payload.id);
		const newChallenge = Object.assign(
			{ ...state.challenge.challenges[i] },
			action.payload.update
		);
		state.challenge.challenges[i] = newChallenge;
	},
	editLog: (state, action) => {
		const i = state.log.logs.findIndex(l => l.id === action.payload.id);
		const oldValue = state.log.logs[i].value;
		const newLog = Object.assign(
			{ ...state.log.logs[i] },
			action.payload.update
		);
		state.log.logs[i] = newLog;
		updateChallengeProgress(state, {
			logDelta: newLog.value-oldValue,
			logActivityId: newLog.activityId,
			logVariation: newLog.variation,
			logTimestamp: newLog.timestamp,
			logs: state.log.logs.filter(l => l.activityId === newLog.activityId)
		}, action.asyncDispatch);
	},


	deleteSeason: (state, action) => {
		state.season.seasons = state.season.seasons.filter(s => s.id !== action.payload.id)
	},
	deleteCategory: (state, action) => {
		state.category.categories = state.category.categories.filter(c => c.id !== action.payload.id)
	},
	deleteGoal: (state, action) => {
		state.goal.goals = state.goal.goals.filter(g => g.id !== action.payload.id)
	},
	deleteActivity: (state, action) => {
		state.activity.activities = state.activity.activities.filter(a => a.id !== action.payload.id)
	},
	deleteChallenge: (state, action) => {
		state.challenge.challenges = state.challenge.challenges.filter(c => c.id !== action.payload.id)
	},
	deleteLog: (state, action) => {
		const oldLog = state.log.logs.find(l => l.id === action.payload.id);
		state.log.logs = state.log.logs.filter(l => l.id !== action.payload.id);
		updateChallengeProgress(state, {
			logDelta: -oldLog.value,
			logActivityId: oldLog.activityId,
			logVariation: oldLog.variation,
			logTimestamp: oldLog.timestamp,
			logs: state.log.logs.filter(l => l.activityId === oldLog.activityId)
		}, action.asyncDispatch);
	},


	copySeason: (state, action) => {
		const oldSeason = state.season.seasons.find(s => s.id === action.payload.id);
		const newSeason = Object.assign({}, oldSeason, { 
			id: GetCurrentUnixTimestamp(),
			title: makeCopyString(oldSeason.title)
		})
		state.season.seasons.push(newSeason);
	},
	copyCategory: (state, action) => {
		const oldCategory = state.category.categories.find(c => c.id === action.payload.id);
		const newCategory = Object.assign({}, oldCategory, {
			id: GetCurrentUnixTimestamp(),
			name: makeCopyString(oldCategory.name)
		})
		state.category.categories.push(newCategory);
	},
	copyGoal: (state, action) => {
		const oldGoal = state.goal.goals.find(g => g.id === action.payload.id);
		const newGoal = Object.assign({}, oldGoal, {
			id:GetCurrentUnixTimestamp(),
		})
		state.goal.goals.push(newGoal);
	},
	copyActivity: (state, action) => {
		const oldActivity = state.activity.activities.find(a => a.id === action.payload.id);
		const newActivity = Object.assign({}, oldActivity, {
			id:GetCurrentUnixTimestamp(),
			label: makeCopyString(oldActivity.label)
		})
		state.activity.activities.push(newActivity);
	},
	copyChallenge: (state, action) => {
		const oldChallenge = state.challenge.challenges.find(c => c.id === action.payload.id);
		const newChallenge = Object.assign({}, oldChallenge, {
			id:GetCurrentUnixTimestamp(),
			taskLabel: makeCopyString(oldChallenge.taskLabel)
		})
		state.challenge.challenges.push(newChallenge);
	},
	copyLog: (state, action) => {
		const oldLog = state.log.logs.find(l => l.id === action.payload.id);
		const newLog = Object.assign({}, oldLog, {
			id:GetCurrentUnixTimestamp(),
		})
		state.log.logs.push(newLog);
		updateChallengeProgress(state, {
			logDelta: newLog.value,
			logActivityId: newLog.activityId,
			logVariation: newLog.variation,
			logTimestamp: newLog.timestamp,
			logs: state.log.logs.filter(l => l.activityId === newLog.activityId)
		}, action.asyncDispatch);
	},


	applySeasonXP: (state, action) => {
		const i = state.season.seasons.findIndex(s => s.id === action.payload.id)
		if (i >= 0) {
			state.season.seasons[i].currentXP += action.payload.xp;
			state.season.seasons[i].currentLevel = Math.floor(state.season.seasons[i].currentXP/state.season.seasons[i].levelXP);
		}
	},
	applyGoalXP: (state, action) => {
		const i = state.goal.goals.findIndex(g => g.id === action.payload.id)
		if (i >= 0)
			state.goal.goals[i].currentXP += action.payload.xp;
	},
	
};