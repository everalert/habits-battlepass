import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputActivityTypeSelector from "../../elements/input/InputActivityTypeSelector.element";
import InputBool from "../../elements/input/InputBool.element";
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';
import InputText from "../../elements/input/InputText.element";
import { addActivity } from "../../redux/slices/Activity.slice";


const mapStateToProps = (state, ownProps) => {
	return {
		base: { ...state.activity.base },
		...state.activity.opts,
		...ownProps
	}
}


function InputActivity({ base, type: typeList, setParentOpen }) {

	const dispatch = useDispatch();

	const [noteInput, setNoteInput] = useState(base.note);
	const [labelInput, setLabelInput] = useState(base.label);
	const [typeInput, setTypeInput] = useState(typeList[0]);
	const [unitInput, setUnitInput] = useState(base.unit);
	const [variationsInput, setVariationsInput] = useState(base.variations);
	const [isReportingIncrementalUnit, setIsReportingIncrementalUnit] = useState(base.isReportingIncremental);

	const resetForm = () => {
		setNoteInput(base.note);
		setLabelInput(base.label);
		setTypeInput(typeList[0]);
		setUnitInput(base.unit);
		setVariationsInput(base.variations);
		setIsReportingIncrementalUnit(base.isReportingIncremental);
	}

	const submitForm = (event) => {
		event.preventDefault();

		const newActivity = Object.assign(base,{
			label: labelInput,
			type: typeInput, 
			unit: unitInput,
			isReportingIncremental: isReportingIncrementalUnit,
			variations: variationsInput,
			note: noteInput
		});
		dispatch(addActivity(newActivity));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<h2 className='-mb-1.5 flex gap-2'>Label</h2>
			<InputText text={labelInput} setParentText={setLabelInput} />
			<h2 className='-mb-1.5 flex gap-2'>Unit</h2>
			<InputText text={unitInput} setParentText={setUnitInput} short={true} />
			<h2 className='-mb-1.5 flex gap-2'>Variations
				<span className="pt-0.5 text-xs text-zinc-400 font-mono">csv</span>
			</h2>
			<InputText text={variationsInput} setParentText={setVariationsInput} />
			<h2 className='-mb-1.5'>Activity Type</h2>
			<InputActivityTypeSelector type={typeInput} setParentType={setTypeInput} />
			<h2 className='-mb-1.5'>Incremental Reporting</h2>
			<InputBool bool={isReportingIncrementalUnit} setParentBool={setIsReportingIncrementalUnit} />
			<h2 className='-mb-1.5 flex gap-2'>Note</h2>
			<InputText text={noteInput} setParentText={setNoteInput} />
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputActivity);