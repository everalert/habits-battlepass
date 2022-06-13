import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputCategoryList from "../../elements/input/InputCategoryList.element";
import InputResetSubmitDeleteCombo from "../../elements/input/InputResetSubmitDeleteCombo.element";
import { deleteCategory, editCategory } from "../../redux/data/Data.slice";
import InputCategory from "./InputCategory.module";


const mapStateToProps = (state, ownProps) => {
	return {
		firstCategory: state.data.category.categories[0],
		...ownProps
	}
}


function InputCategoryEdit({ firstCategory, setParentOpen }) {

	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState(firstCategory);

	const [newCategory, updateNewCategory] = useState({...selectedCategory});

	const resetForm = () => {
		updateNewCategory({...selectedCategory});
	}

	useEffect(()=>{
		updateNewCategory({...selectedCategory});
	}, [selectedCategory])

	const submitForm = (event) => {
		event.preventDefault();
		const { id, ...update } = newCategory;
		dispatch(editCategory({ id:id, update:update }));
		resetForm();
		setParentOpen(false);
	}

	const deleteFunc = () => {
		dispatch(deleteCategory(selectedCategory));
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
		<div className="mb-3 pb-3 border-b-2 border-zinc-800">
			<InputCategoryList selectedCategory={selectedCategory} setParentCategory={setSelectedCategory} />
		</div>
		<InputCategory categoryObj={newCategory} setCategoryObj={updateNewCategory} />
		<div className="mt-3 pt-3 border-t-2 border-zinc-800">
			<InputResetSubmitDeleteCombo resetFunc={resetForm} submitFunc={submitForm} deleteFunc={deleteFunc} />
		</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputCategoryEdit);