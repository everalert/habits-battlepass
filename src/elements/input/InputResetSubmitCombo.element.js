import InputResetButton from "./InputResetButton.element";
import InputSubmitButton from "./InputSubmitButton.element";

export default function InputResetSubmitCombo({ resetFunc, submitFunc }) {
	return (
		<div className='flex gap-3 ml-auto mt-1'>
			<InputResetButton resetFunc={resetFunc} />
			<InputSubmitButton submitFunc={submitFunc} />
		</div>
	)
}