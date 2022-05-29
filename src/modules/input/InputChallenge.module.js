import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputBool from "../../elements/input/InputBool.element";
import InputDuration from '../../elements/input/InputDuration.element';
import InputGoalList from '../../elements/input/InputGoalList.element';
import InputPeriodSelector from "../../elements/input/InputPeriodSelector.element";
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';
import InputText from "../../elements/input/InputText.element";
import { PrepareNewChallenge } from "../../redux/helpers/Challenge.helper";
import { addChallenge } from "../../redux/slices/Challenge.slice";


const mapStateToProps = (state, ownProps) => {
	return {
		firstActivity: state.activity.activities[0],
		firstGoal: state.goal.goals[0],
		...state.challenge.opts,
		...ownProps
	}
}


function InputChallenge({ firstActivity, firstGoal, period, labelInsert, setParentOpen }) {

	const dispatch = useDispatch();
	const blankChallenge = PrepareNewChallenge();


	const [selectedGoal, setSelectedGoal] = useState(firstGoal);

	const [selectedActivity, setSelectedActivity] = useState(firstActivity);
	const [selectedVariation, setSelectedVariation] = useState('');
	const [isTimeTask, setIsTimeTask] = useState(selectedActivity.type === 'time');

	useEffect(()=>{
		setIsTimeTask(selectedActivity.type === 'time')
	}, [selectedActivity]);

	const [labelInput, setLabelInput] = useState(blankChallenge.taskLabel);
	const [durationInput, setDurationInput] = useState(0);
	const [amountInput, setAmountInput] = useState(0);
	const [xpInput, setXpInput] = useState(0);
	const [periodInput, setPeriodInput] = useState(period[0]);
	const [isTemplateInput, setIsTemplateInput] = useState(true);

	const resetForm = () => {
		setSelectedGoal(firstGoal);
		setSelectedActivity(firstActivity);
		setDurationInput(0);
		setAmountInput(0);
		setXpInput(0);
		setIsTemplateInput(true);
	}

	const submitForm = (event) => {
		event.preventDefault();
		const value = isTimeTask ? durationInput : amountInput;
		if ((selectedActivity.isReportingIncremental && value > 0) || !selectedActivity.isReportingIncremental) {
			const newChallenge = Object.assign(blankChallenge,{
				goalId: selectedGoal.id,
				taskLabel: labelInput,
				taskActivityId: selectedActivity.id,
				taskAmount: value,
				taskVariation: selectedVariation,
				taskXP: xpInput,
				period: periodInput,
				isTemplate: isTemplateInput
			});
			dispatch(addChallenge(newChallenge));
			resetForm();
			setParentOpen(false);
		}
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
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
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputChallenge);