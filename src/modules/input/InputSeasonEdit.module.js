import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitDeleteCopyCombo from "../../elements/input/InputResetSubmitDeleteCopyCombo.element";
import InputSeasonList from "../../elements/input/InputSeasonList.element";
import { copySeason, deleteSeason, editSeason } from "../../redux/data/Data.slice";
import InputSeason from "./InputSeason.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstSeason: state.data.season.seasons[0] ,
		...state.data.season.opts,
		...ownProps
	}
}


function InputSeasonEdit({ firstSeason, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedSeason, setSelectedSeason] = useState(firstSeason);

	const [newSeason, updateNewSeason] = useState({...selectedSeason});
	
	const resetForm = () => {
		updateNewSeason({...selectedSeason});
	}

	useEffect(()=>{
		updateNewSeason({...selectedSeason});
	}, [selectedSeason])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newSeason
		dispatch(editSeason({ id:id, update:update }));
		resetForm();
		setParentOpen(false);
	}

	const deleteFunc = () => {
		dispatch(deleteSeason(selectedSeason));
	}

	const copyFunc = () => {
		dispatch(copySeason({ id: selectedSeason.id }))
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<div className="mb-3 pb-3 border-b-2 border-zinc-800">
				<InputSeasonList selectedSeason={selectedSeason} setParentSeason={setSelectedSeason} />
			</div>
			<InputSeason seasonObj={newSeason} setSeasonObj={updateNewSeason} />
			<div className="mt-3 pt-3 border-t-2 border-zinc-800">
				<InputResetSubmitDeleteCopyCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} copyFunc={copyFunc} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputSeasonEdit);