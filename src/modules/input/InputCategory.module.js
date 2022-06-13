import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputText from "../../elements/input/InputText.element";


const mapStateToProps = (state, ownProps) => {
	return {
		base: { ...state.data.category.base },
		...state.data.category.opts,
		...ownProps
	}
}


function InputCategory({ base, categoryObj, setCategoryObj }) {

	const dispatch = useDispatch();

	const [nameInput, setNameInput] = useState(categoryObj.name);
	const [iconInput, setIconInput] = useState(categoryObj.icon);
	const [descriptionInput, setDescriptionInput] = useState(categoryObj.description);

	useEffect(() => {
		setNameInput(categoryObj.name);
		setIconInput(categoryObj.icon);
		setDescriptionInput(categoryObj.description);
	}, [categoryObj])

	useEffect(()=> {
		setCategoryObj(Object.assign({...categoryObj}, { name: nameInput }))
	}, [nameInput])

	useEffect(()=> {
		setCategoryObj(Object.assign({...categoryObj}, { icon: iconInput }))
	}, [iconInput])

	useEffect(()=> {
		setCategoryObj(Object.assign({...categoryObj}, { description: descriptionInput }))
	}, [descriptionInput])

	return (
		<>
			<h2 className='-mb-1.5 flex gap-2'>Name</h2>
			<InputText text={nameInput} setParentText={setNameInput} />
			<h2 className='-mb-1.5 flex gap-2'>Icon</h2>
			<InputText text={iconInput} setParentText={setIconInput} short={true} />
			<h2 className='-mb-1.5 flex gap-2'>Description</h2>
			<InputText text={descriptionInput} setParentText={setDescriptionInput} />
		</>
	)

}

export default connect(mapStateToProps)(InputCategory);