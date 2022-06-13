import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputActivityList from "../../elements/input/InputActivityList.element";
import InputResetSubmitDeleteCombo from "../../elements/input/InputResetSubmitDeleteCombo.element";
import { deleteActivity, editActivity } from "../../redux/data/Data.slice";
import InputActivity from "./InputActivity.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstActivity: state.data.activity.activities[0],
		...ownProps
	}
}


function InputActivityEdit({ firstActivity, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedActivity, setSelectedActivity] = useState(firstActivity);

	const [newActivity, updateNewActivity] = useState({...selectedActivity});

	const resetForm = () => {
		updateNewActivity({...selectedActivity});
	}

	useEffect(()=>{
		updateNewActivity({...selectedActivity});
	}, [selectedActivity])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newActivity
		dispatch(editActivity({ id:id, update:update }));
		resetForm();
		setParentOpen(false);
	}

	const deleteFunc = () => {
		dispatch(deleteActivity(selectedActivity));
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<div className="mb-3 pb-3 border-b-2 border-zinc-800">
				<InputActivityList selectedActivity={selectedActivity} setParentActivity={setSelectedActivity} />
			</div>
			<InputActivity activityObj={newActivity} setActivityObj={updateNewActivity} />
			<div className="mt-3 pt-3 border-t-2 border-zinc-800">
				<InputResetSubmitDeleteCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputActivityEdit);