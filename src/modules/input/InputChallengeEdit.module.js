import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputChallengeList from "../../elements/input/InputChallengeList.element";
import InputResetSubmitDeleteCombo from "../../elements/input/InputResetSubmitDeleteCombo.element";
import { deleteChallenge, editChallenge } from "../../redux/data/Data.slice";
import InputChallenge from "./InputChallenge.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstChallenge: state.data.challenge.challenges[0],
		activities: state.data.activity.activities,
		...ownProps
	}
}


function InputChallengeEdit({ firstChallenge, activities, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedChallenge, setSelectedChallenge] = useState(firstChallenge);

	const [newChallenge, updateNewChallenge] = useState({...selectedChallenge});

	const resetForm = () => {
		updateNewChallenge({...selectedChallenge});
	}

	useEffect(()=>{
		updateNewChallenge({...selectedChallenge});
	}, [selectedChallenge])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newChallenge;
		const a = activities.find(a => a.id === newChallenge.taskActivityId);
		if ((a.isReportingIncremental && newChallenge.taskAmount > 0) || !a.isReportingIncremental) {
			dispatch(editChallenge({ id:id, update:update }));
			resetForm();
			setParentOpen(false);
		}
	}

	const deleteFunc = () => {
		dispatch(deleteChallenge(selectedChallenge));
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
		<div className="mb-3 pb-3 border-b-2 border-zinc-800">
			<InputChallengeList selectedChallenge={selectedChallenge} setParentChallenge={setSelectedChallenge} />
		</div>
		<InputChallenge challengeObj={newChallenge} setChallengeObj={updateNewChallenge} />
		<div className="mt-3 pt-3 border-t-2 border-zinc-800">
			<InputResetSubmitDeleteCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} />
		</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputChallengeEdit);