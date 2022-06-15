import InputCopyButton from "./InputCopyButton.element";
import InputDeleteButton from "./InputDeleteButton.element";
import InputResetButton from "./InputResetButton.element";
import InputSubmitButton from "./InputSubmitButton.element";

export default function InputResetSubmitDeleteCombo({ resetFunc, submitFunc, deleteFunc, copyFunc }) {
	return (
		<div className='flex gap-3'>
			<InputDeleteButton deleteFunc={deleteFunc} />
			<InputCopyButton copyFunc={copyFunc} />
			<div className="grow" />
			<InputResetButton resetFunc={resetFunc} />
			<InputSubmitButton submitFunc={submitFunc} />
		</div>
	)
}