import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputCopyButton from "../../elements/input/InputCopyButton.element";
import InputEnableButton from "../../elements/input/InputEnableButton.element";
import InputResetSubmitDeleteCopyCombo from "../../elements/input/InputResetSubmitDeleteCopyCombo.element";
import InputSeasonList from "../../elements/input/InputSeasonList.element";
import { copySeason, deleteSeason, editSeason, setActiveSeason } from "../../redux/data/Data.slice";
import InputSeason from "./InputSeason.module";


const mapStateToProps = (state, ownProps) => {
	return {
		activeSeason: state.data.season.seasons[state.data.season.active] ,
		...state.data.season.opts,
		...ownProps
	}
}


function InputSeasonEdit({ activeSeason, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedSeason, setSelectedSeason] = useState(activeSeason);

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

	const enableFunc = () => {
		dispatch(setActiveSeason({ id: selectedSeason.id }))
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<div className="flex gap-2 mb-3 pb-3 border-b-2 border-zinc-800">
				<div className="grow">
					<InputSeasonList selectedSeason={selectedSeason} setParentSeason={setSelectedSeason} />
				</div>
				<InputEnableButton enableFunc={enableFunc} />
			</div>
			<InputSeason seasonObj={newSeason} setSeasonObj={updateNewSeason} />
			<div className="mt-3 pt-3 border-t-2 border-zinc-800">
				<InputResetSubmitDeleteCopyCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} copyFunc={copyFunc} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputSeasonEdit);