import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addGoal } from "../../redux/slices/Goal.slice";
import InputGoal from "./InputGoal.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankGoal: Object.assign({...state.goal.base}, {
			seasonId: Math.max(state.goal.base.seasonId, state.season.seasons[0].id),
			categoryId: Math.max(state.goal.base.categoryId, state.category.categories[0].id),
			goalLagActivityId: Math.max(state.goal.base.goalLagActivityId, state.activity.activities[0].id),
			goalLeadActivityId: Math.max(state.goal.base.goalLeadActivityId, state.activity.activities[0].id),
		}),
		...ownProps
	}
}


function InputGoalAdd({ blankGoal, setParentOpen }) {

	const dispatch = useDispatch();

	const [newGoal, updateNewGoal] = useState({...blankGoal});

	const resetForm = () => {
		updateNewGoal({...blankGoal});
	}

	const submitForm = (event) => {
		event.preventDefault();
		dispatch(addGoal(newGoal));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputGoal goalObj={newGoal} setGoalObj={updateNewGoal} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputGoalAdd);