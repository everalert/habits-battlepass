import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addChallenge } from "../../redux/slices/Challenge.slice";
import InputChallenge from "./InputChallenge.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankChallenge: Object.assign({...state.challenge.base}, {
			taskActivityId: Math.max(state.challenge.base.taskActivityId, state.activity.activities[0].id),
			goalId: Math.max(state.challenge.base.goalId, state.goal.goals[0].id)
		}),
		activities: state.activity.activities,
		...ownProps
	}
}


function InputChallengeAdd({ blankChallenge, activities, setParentOpen }) {

	const dispatch = useDispatch();

	const [newChallenge, updateNewChallenge] = useState({...blankChallenge});

	const resetForm = () => {
		updateNewChallenge({...blankChallenge});
	}

	const submitForm = (event) => {
		event.preventDefault();
		const a = activities.find(a => a.id === newChallenge.taskActivityId);
		if ((a.isReportingIncremental && newChallenge.taskAmount > 0) || !a.isReportingIncremental) {
			dispatch(addChallenge(newChallenge));
			resetForm();
			setParentOpen(false);
		}
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputChallenge challengeObj={newChallenge} setChallengeObj={updateNewChallenge} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputChallengeAdd);