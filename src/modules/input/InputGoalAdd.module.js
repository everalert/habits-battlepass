import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addGoal } from "../../redux/data/Data.slice";
import InputGoal from "./InputGoal.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankGoal: Object.assign({...state.data.goal.base}, {
			seasonId: Math.max(state.data.goal.base.seasonId, state.data.season.seasons[0].id),
			categoryId: Math.max(state.data.goal.base.categoryId, state.data.category.categories[0].id),
			goalLagActivityId: Math.max(state.data.goal.base.goalLagActivityId, state.data.activity.activities[0].id),
			goalLeadActivityId: Math.max(state.data.goal.base.goalLeadActivityId, state.data.activity.activities[0].id),
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