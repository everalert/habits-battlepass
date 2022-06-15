import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputLogList from "../../elements/input/InputLogList.element";
import InputResetSubmitDeleteCopyCombo from "../../elements/input/InputResetSubmitDeleteCopyCombo.element";
import { copyLog, deleteLog, editLog } from '../../redux/data/Data.slice';
import InputLog from "./InputLog.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstLog: state.data.log.logs[0],
		activities: state.data.activity.activities,
		...ownProps
	}
}


function InputLogEdit({ firstLog, activities, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedLog, setSelectedLog] = useState(firstLog);

	const [newLog, updateNewLog] = useState({...selectedLog});

	const resetForm = () => {
		updateNewLog({...selectedLog});
	}

	useEffect(()=>{
		updateNewLog({...selectedLog});
	}, [selectedLog])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newLog
		const a = activities.find(a => a.id === newLog.activityId);
		if ((a.isReportingIncremental && newLog.value > 0) || !a.isReportingIncremental) {
			dispatch(editLog({ id:id, update:update }));
			resetForm();
			setParentOpen(false);
		}
	}

	const deleteFunc = () => {
		dispatch(deleteLog(selectedLog));
	}

	const copyFunc = () => {
		dispatch(copyLog({ id: selectedLog.id }))
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<div className="mb-3 pb-3 border-b-2 border-zinc-800">
				<InputLogList selectedLog={selectedLog} setParentLog={setSelectedLog} />
			</div>
			<InputLog logObj={newLog} setLogObj={updateNewLog} />
			<div className="mt-3 pt-3 border-t-2 border-zinc-800">
				<InputResetSubmitDeleteCopyCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} copyFunc={copyFunc} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputLogEdit);