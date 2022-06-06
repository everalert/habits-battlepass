import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputActivityTypeSelector from "../../elements/input/InputActivityTypeSelector.element";
import InputBool from "../../elements/input/InputBool.element";
import InputText from "../../elements/input/InputText.element";


const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	}
}


function InputActivity({ activityObj, setActivityObj }) {

	const [noteInput, setNoteInput] = useState(activityObj.note);
	const [labelInput, setLabelInput] = useState(activityObj.label);
	const [typeInput, setTypeInput] = useState(activityObj.type);
	const [unitInput, setUnitInput] = useState(activityObj.unit);
	const [variationsInput, setVariationsInput] = useState(activityObj.variations);
	const [isReportingIncrementalUnit, setIsReportingIncrementalUnit] = useState(activityObj.isReportingIncremental);

	useEffect(() => {
		setNoteInput(activityObj.note);
		setLabelInput(activityObj.label);
		setTypeInput(activityObj.type);
		setUnitInput(activityObj.unit);
		setVariationsInput(activityObj.variations);
		setIsReportingIncrementalUnit(activityObj.isReportingIncremental);
	}, [activityObj])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { note: noteInput }));
	}, [noteInput])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { label: labelInput }));
	}, [labelInput])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { type: typeInput }));
	}, [typeInput])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { unit: unitInput }));
	}, [unitInput])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { variations: variationsInput }));
	}, [variationsInput])

	useEffect(()=>{
		setActivityObj(Object.assign({...activityObj}, { isReportingIncremental: isReportingIncrementalUnit }));
	}, [isReportingIncrementalUnit])

	return (
		<>
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
		</>
	)

}

export default connect(mapStateToProps)(InputActivity);