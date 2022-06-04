import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputAmountIncrementButton from '../../elements/input/InputAmountButton.element';
import InputDateTimeSelectorCombo from "../../elements/input/InputDateTimeSelectorCombo.element";
import InputDuration from '../../elements/input/InputDuration.element';


const mapStateToProps = (state, ownProps) => {
	return {
		activity: state.activity.activities.find(a => a.id === ownProps.logObj.activityId),
		activities: state.activity.activities,
		...ownProps
	}
}


function InputLog({ activity, activities, logObj, setLogObj }) {

	const [selectedActivity, setSelectedActivity] = useState(activity);
	const [selectedVariation, setSelectedVariation] = useState(logObj.variation);
	const [isTimeTask, setIsTimeTask] = useState(selectedActivity.type === 'time');

	const [timestamp, setTimestamp] = useState(logObj.timestamp);

	const [durationInput, setDurationInput] = useState(logObj.value);
	const [amountInput, setAmountInput] = useState(logObj.value);

	useEffect(()=>{
		setSelectedActivity(activities.find(a => a.id === logObj.activityId));
		setSelectedVariation(logObj.variation);
		setTimestamp(logObj.timestamp);
		setDurationInput(logObj.value);
		setAmountInput(logObj.value);
	}, [logObj])

	useEffect(()=>{
		setLogObj(Object.assign({...logObj}, {timestamp: timestamp}));
	}, [timestamp]);

	useEffect(()=>{
		setLogObj(Object.assign({...logObj}, {variation: selectedVariation}));
	}, [selectedVariation]);

	useEffect(()=>{
		setLogObj(Object.assign({...logObj}, {value: isTimeTask ? durationInput : amountInput}));
	}, [durationInput, amountInput, isTimeTask]);
	
	useEffect(()=>{
		setLogObj(Object.assign({...logObj}, {activityId: selectedActivity.id}));
		setIsTimeTask(selectedActivity.type === 'time');
	}, [selectedActivity]);

	return (
		<>
			<h2 className='-mb-1.5'>Date & Time</h2>
			<InputDateTimeSelectorCombo timestamp={timestamp} setParentTimestamp={setTimestamp} />
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
		</>
	)

}

export default connect(mapStateToProps)(InputLog);