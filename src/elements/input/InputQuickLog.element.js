import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { PrepareNewLog } from "../../redux/helpers/Log.helper";
import { addLog } from '../../redux/slices/Log.slice';
import InputAmount from './InputAmount.element';
import InputAmountIncrementButton from './InputAmountButton.element';
import InputDuration from './InputDuration.element';
import InputSubmitButton from './InputSubmitButton.element';


export default function InputQuickLog({ activity, variation }) {

	const dispatch = useDispatch();
	const blankLog = PrepareNewLog();

	const [isFocused, updateFocusedState] = useState(false);
	const focus = () => updateFocusedState(true);
	const unfocus = () => updateFocusedState(false);

	const [isTimeTask, setTimeTask] = useState(activity.type === 'time');
	
	const [durationInput, setDurationInput] = useState(0);
	const [amountInput, setAmountInput] = useState(0);

	const [quickSubmit, setQuickSubmit] = useState(false);

	const quickSubmitAmount = (amount) => {
		setAmountInput(amount);
		setQuickSubmit(true);
	}
	
	const resetForm = () => {
		setQuickSubmit(false);
		setDurationInput(0);
		setAmountInput(0);
	}

	const submitForm = (event) => {
		event.preventDefault();
		const value = isTimeTask ? durationInput : amountInput;
		if ((activity.isReportingIncremental && value > 0) || !activity.isReportingIncremental) {
			const newLog = Object.assign(blankLog,{
				activityId: activity.id,
				value: value,
				variation: variation
			});
			dispatch(addLog(newLog));
			resetForm();
			unfocus();
		}
	}

	useEffect(()=>{
		if (quickSubmit)
			submitForm(new Event(''));
	}, [quickSubmit]);

	return (
		<form onSubmit={submitForm} className={`h-7 text-sm flex justify-center gap-2 absolute inset-x-0.5 transition-all top-1/2 ${isFocused ? '-mt-4 opacity-100' : '-mt-3 opacity-0 group-hover:-mt-4 group-hover:opacity-100'}`}>
			<div className="flex gap-0.5 overflow-hidden">
				{ !isTimeTask && <InputAmount amount={amountInput} setParentAmount={setAmountInput} onFocus={focus} onBlur={unfocus} /> }
				{ isTimeTask && <InputDuration timestamp={durationInput} setParentTimestamp={setDurationInput} onFocus={focus} onBlur={unfocus} /> }
				<InputSubmitButton submitFunc={submitForm} />
			</div>
			{ !isTimeTask && <InputAmountIncrementButton amount={amountInput} setParentAmount={quickSubmitAmount} /> }
		</form>
	)

}