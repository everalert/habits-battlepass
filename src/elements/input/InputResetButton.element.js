import { RefreshIcon } from '@heroicons/react/solid';


export default function InputResetButton({ resetFunc }) {

	return (
		<label className="h-7 w-7 rounded-full bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer">
			<input type="button" onClick={resetFunc} value='RESET' className="hidden" />
			<RefreshIcon className="w-5 h-5 mx-auto mt-1"/>
		</label>
	)

}