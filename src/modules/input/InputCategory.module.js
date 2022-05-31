import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';
import InputText from "../../elements/input/InputText.element";
import { addCategory } from "../../redux/slices/Category.slice";


const mapStateToProps = (state, ownProps) => {
	return {
		base: { ...state.category.base },
		...state.category.opts,
		...ownProps
	}
}


function InputCategory({ base, setParentOpen }) {

	const dispatch = useDispatch();

	const [nameInput, setNameInput] = useState(base.name);
	const [iconInput, setIconInput] = useState(base.icon);
	const [descriptionInput, setDescriptionInput] = useState(base.description);

	const resetForm = () => {
		setNameInput(base.name);
		setIconInput(base.icon);
		setDescriptionInput(base.description);
	}

	const submitForm = (event) => {
		event.preventDefault();

		const newCategory = Object.assign(base,{
			name: nameInput,
			icon: iconInput,
			description: descriptionInput
		});
		dispatch(addCategory(newCategory));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<h2 className='-mb-1.5 flex gap-2'>Name</h2>
			<InputText text={nameInput} setParentText={setNameInput} />
			<h2 className='-mb-1.5 flex gap-2'>Icon</h2>
			<InputText text={iconInput} setParentText={setIconInput} short={true} />
			<h2 className='-mb-1.5 flex gap-2'>Description</h2>
			<InputText text={descriptionInput} setParentText={setDescriptionInput} />
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputCategory);