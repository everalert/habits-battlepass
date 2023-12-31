import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputGoalList from "../../elements/input/InputGoalList.element";
import InputResetSubmitDeleteCopyCombo from "../../elements/input/InputResetSubmitDeleteCopyCombo.element";
import { copyGoal, deleteGoal, editGoal } from "../../redux/data/Data.slice";
import InputGoal from "./InputGoal.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstGoal: state.data.goal.goals[0],
		...ownProps
	}
}


function InputGoalEdit({ firstGoal, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedGoal, setSelectedGoal] = useState(firstGoal);

	const [newGoal, updateNewGoal] = useState({...selectedGoal});

	const resetForm = () => {
		updateNewGoal({...selectedGoal});
	}

	useEffect(()=>{
		updateNewGoal({...selectedGoal});
	}, [selectedGoal])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newGoal
		dispatch(editGoal({ id:id, update:update }));
		resetForm();
		setParentOpen(false);
	}

	const deleteFunc = () => {
		dispatch(deleteGoal(selectedGoal));
	}

	const copyFunc = () => {
		dispatch(copyGoal({ id: selectedGoal.id }))
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<div className="mb-3 pb-3 border-b-2 border-zinc-800">
				<InputGoalList selectedGoal={selectedGoal} setParentGoal={setSelectedGoal} />
			</div>
			<InputGoal goalObj={newGoal} setGoalObj={updateNewGoal} />
			<div className="mt-3 pt-3 border-t-2 border-zinc-800">
				<InputResetSubmitDeleteCopyCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} copyFunc={copyFunc} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputGoalEdit);