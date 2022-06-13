import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addSeason } from "../../redux/data/Data.slice";
import InputSeason from "./InputSeason.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankSeason: { ...state.data.season.base },
		...ownProps
	}
}


function InputSeasonAdd({ blankSeason, setParentOpen }) {

	const dispatch = useDispatch();

	const [newSeason, updateNewSeason] = useState({...blankSeason});

	const resetForm = () => {
		updateNewSeason({...blankSeason});
	}

	const submitForm = (event) => {
		event.preventDefault();
		dispatch(addSeason(newSeason));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputSeason seasonObj={newSeason} setSeasonObj={updateNewSeason} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputSeasonAdd);