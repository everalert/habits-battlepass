import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { GetCurrentUnixTimestamp } from '../../helpers/Math.helper';
import { PrepareNewLog } from "../../redux/helpers/Log.helper";
import { addLog } from '../../redux/slices/Log.slice';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputAmountIncrementButton from '../../elements/input/InputAmountButton.element';
import InputDateTime from '../../elements/input/InputDateTime.element';
import InputDateTimeSelector from '../../elements/input/InputDateTimeSelector.element';
import InputDuration from '../../elements/input/InputDuration.element';
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';


const mapStateToProps = (state, ownProps) => {
	return {
		firstActivity: state.activity.activities[0],
		...ownProps
	}
}


function InputLog({ firstActivity, setParentOpen }) {

	const dispatch = useDispatch();
	const blankLog = PrepareNewLog();

	const [selectedActivity, setSelectedActivity] = useState(firstActivity);
	const [selectedVariation, setSelectedVariation] = useState('')
	const [isTimeTask, setIsTimeTask] = useState(selectedActivity.type === 'time');
	
	useEffect(()=>{
		setIsTimeTask(selectedActivity.type === 'time')
	}, [selectedActivity]);

	const [timestamp, setTimestamp] = useState(GetCurrentUnixTimestamp())

	const [durationInput, setDurationInput] = useState(0);
	const [amountInput, setAmountInput] = useState(0);

	const resetForm = () => {
		setSelectedActivity(firstActivity);
		setTimestamp(GetCurrentUnixTimestamp());
		setDurationInput(0);
		setAmountInput(0);
	}

	const submitForm = (event) => {
		event.preventDefault();
		const value = isTimeTask ? durationInput : amountInput;
		if ((selectedActivity.isReportingIncremental && value > 0) || !selectedActivity.isReportingIncremental) {
			const newLog = Object.assign(blankLog,{
				activityId: selectedActivity.id,
				value: value,
				variation: selectedVariation
			});
			dispatch(addLog(newLog));
			resetForm();
			setParentOpen(false);
		}
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<h2 className='-mb-1.5'>Date & Time</h2>
			<div className='flex gap-1'>
				<InputDateTime timestamp={timestamp} setParentTimestamp={setTimestamp} />
				<InputDateTimeSelector timestamp={timestamp} setParentTimestamp={setTimestamp} />
			</div>
			<h2 className='-mb-1.5'>Activity</h2>
			<InputActivityList selectedActivity={selectedActivity} setParentActivity={setSelectedActivity} />
			<h2 className='-mb-1.5'>Variation</h2>
			<InputActivityVariationList activity={selectedActivity} setParentVariation={setSelectedVariation} />
			{ !isTimeTask && <>
				<h2 className='-mb-1.5'>Amount to Log</h2>
				<div className='flex gap-1'>
					<InputAmount amount={amountInput} setParentAmount={setAmountInput} />
					<InputAmountIncrementButton amount={amountInput} setParentAmount={setAmountInput} />
				</div>
			</> }
			{ isTimeTask && <>
				<h2 className='-mb-1.5'>Duration to Log</h2>
				<InputDuration timestamp={durationInput} setParentTimestamp={setDurationInput} />
			</> }
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputLog);