import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from '../../elements/input/InputResetSubmitCombo.element';
import { addLog } from '../../redux/slices/Log.slice';
import InputLog from "./InputLog.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankLog: Object.assign({...state.log.base}, {
			activityId: Math.max(state.log.base.activityId, state.activity.activities[0].id)
		}),
		activities: state.activity.activities,
		...ownProps
	}
}


function InputLogAdd({ blankLog, activities, setParentOpen }) {

	const dispatch = useDispatch();

	const [newLog, updateNewLog] = useState({...blankLog});

	const resetForm = () => {
		updateNewLog({...blankLog});
	}

	const submitForm = (event) => {
		event.preventDefault();
		const a = activities.find(a => a.id === newLog.activityId);
		if ((a.isReportingIncremental && newLog.value > 0) || !a.isReportingIncremental) {
			dispatch(addLog(newLog));
			resetForm();
			setParentOpen(false);
		}
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputLog logObj={newLog} setLogObj={updateNewLog} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputLogAdd);