import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetSubmitCombo from "../../elements/input/InputResetSubmitCombo.element";
import { addCategory } from "../../redux/data/Data.slice";
import InputCategory from "./InputCategory.module";


const mapStateToProps = (state, ownProps) => {
	return {
		blankCategory: { ...state.data.category.base },
		...ownProps
	}
}


function InputCategoryAdd({ blankCategory, setParentOpen }) {

	const dispatch = useDispatch();

	const [newCategory, updateNewCategory] = useState({...blankCategory});

	const resetForm = () => {
		updateNewCategory({...blankCategory});
	}

	const submitForm = (event) => {
		event.preventDefault();
		dispatch(addCategory(newCategory));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<InputCategory categoryObj={newCategory} setCategoryObj={updateNewCategory} />
			<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
		</form>
	)

}

export default connect(mapStateToProps)(InputCategoryAdd);