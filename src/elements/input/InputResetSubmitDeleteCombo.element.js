import InputDeleteButton from "./InputDeleteButton.element";
import InputResetButton from "./InputResetButton.element";
import InputSubmitButton from "./InputSubmitButton.element";

export default function InputResetSubmitDeleteCombo({ resetFunc, submitFunc, deleteFunc }) {
	return (
		<div className='flex gap-3'>
			<InputDeleteButton deleteFunc={deleteFunc} />
			<InputResetButton resetFunc={resetFunc} />
			<InputSubmitButton submitFunc={submitFunc} />
		</div>
	)
}