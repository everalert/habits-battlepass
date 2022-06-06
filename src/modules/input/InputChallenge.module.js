import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputBool from "../../elements/input/InputBool.element";
import InputDuration from '../../elements/input/InputDuration.element';
import InputGoalList from '../../elements/input/InputGoalList.element';
import InputPeriodSelector from "../../elements/input/InputPeriodSelector.element";
import InputText from "../../elements/input/InputText.element";


const mapStateToProps = (state, ownProps) => {
	return {
		activity: state.activity.activities.find(a => a.id === ownProps.challengeObj.taskActivityId),
		activities: state.activity.activities,
		goal: state.goal.goals.find(g => g.id === ownProps.challengeObj.goalId),
		goals: state.goal.goals,
		...state.challenge.opts,
		...ownProps
	}
}


function InputChallenge({ activity, activities, goal, goals, labelInsert, challengeObj, setChallengeObj }) {

	const [selectedGoal, setSelectedGoal] = useState(goal);
	const [selectedActivity, setSelectedActivity] = useState(activity);
	const [selectedVariation, setSelectedVariation] = useState(challengeObj.taskVariation);
	const [isTimeTask, setIsTimeTask] = useState(selectedActivity.type === 'time');

	useEffect(()=>{
		setIsTimeTask(selectedActivity.type === 'time')
	}, [selectedActivity]);

	const [labelInput, setLabelInput] = useState(challengeObj.taskLabel);
	const [durationInput, setDurationInput] = useState(challengeObj.taskAmount);
	const [amountInput, setAmountInput] = useState(challengeObj.taskAmount);
	const [xpInput, setXpInput] = useState(challengeObj.taskXP);
	const [periodInput, setPeriodInput] = useState(challengeObj.period);
	const [isTemplateInput, setIsTemplateInput] = useState(challengeObj.isTemplate);

	useEffect(()=>{
		setLabelInput(challengeObj.taskLabel);
		setSelectedGoal(goals.find(g => g.id === challengeObj.goalId));
		setSelectedActivity(activities.find(a => a.id === challengeObj.taskActivityId));
		setSelectedVariation(challengeObj.taskVariation);
		setDurationInput(challengeObj.taskAmount);
		setAmountInput(challengeObj.taskAmount);
		setXpInput(challengeObj.taskXP);
		setPeriodInput(challengeObj.period);
		setIsTemplateInput(challengeObj.isTemplate);
	}, [challengeObj])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {taskLabel: labelInput}));
	}, [labelInput])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {goalId: selectedGoal.id}));
	}, [selectedGoal])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {taskVariation: selectedVariation}));
	}, [selectedVariation])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {taskAmount: isTimeTask ? durationInput : amountInput}));
	}, [isTimeTask, durationInput, amountInput])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {taskXP: xpInput}));
	}, [xpInput])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {period: periodInput}));
	}, [periodInput])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {isTemplate: isTemplateInput}));
	}, [isTemplateInput])

	useEffect(()=>{
		setChallengeObj(Object.assign({...challengeObj}, {taskActivityId: selectedActivity.id}));
		setIsTimeTask(selectedActivity.type === 'time');
	}, [selectedActivity])

	return (
		<>
			<h2 className='-mb-1.5 flex gap-2'>Label
				<span className="pt-0.5 flex gap-1 text-xs text-zinc-400 font-mono">
					{labelInsert.map((l,i)=><span key={i}>{l}</span>)}
				</span>
			</h2>
			<InputText text={labelInput} setParentText={setLabelInput} />
			<h2 className='-mb-1.5'>Goal</h2>
			<InputGoalList selectedGoal={selectedGoal} setParentGoal={setSelectedGoal} />
			<h2 className='-mb-1.5'>Activity</h2>
			<InputActivityList selectedActivity={selectedActivity} setParentActivity={setSelectedActivity} />
			<h2 className='-mb-1.5'>Activity Variation</h2>
			<InputActivityVariationList activity={selectedActivity} setParentVariation={setSelectedVariation} />
			{ !isTimeTask && <>
				<h2 className='-mb-1.5'>Challenge Amount</h2>
				<InputAmount amount={amountInput} setParentAmount={setAmountInput} />
			</> }
			{ isTimeTask && <>
				<h2 className='-mb-1.5'>Challenge Duration</h2>
				<InputDuration timestamp={durationInput} setParentTimestamp={setDurationInput} />
			</> }
			<h2 className='-mb-1.5'>Challenge XP</h2>
			<InputAmount amount={xpInput} setParentAmount={setXpInput} />
			<h2 className='-mb-1.5'>Period</h2>
			<InputPeriodSelector period={periodInput} setParentPeriod={setPeriodInput} />
			<h2 className='-mb-1.5'>Recurring (template)</h2>
			<InputBool bool={isTemplateInput} setParentBool={setIsTemplateInput} />
		</>
	)

}

export default connect(mapStateToProps)(InputChallenge);