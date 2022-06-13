import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addActivity } from "../../redux/data/Data.slice";
import InputActivity from "./InputActivity.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankActivity: { ...state.data.activity.base },
		...ownProps
	}
}


function InputActivityAdd({ blankActivity, setParentOpen }) {

	const dispatch = useDispatch();

	const [newActivity, updateNewActivity] = useState({...blankActivity});

	const resetForm = () => {
		updateNewActivity({...blankActivity});
	}

	const submitForm = (event) => {
		event.preventDefault();
		dispatch(addActivity(newActivity));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputActivity activityObj={newActivity} setActivityObj={updateNewActivity} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputActivityAdd);
