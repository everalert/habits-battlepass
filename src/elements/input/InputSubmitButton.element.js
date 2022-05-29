import { ChevronDoubleRightIcon } from '@heroicons/react/solid';


export default function InputSubmitButton({ submitFunc }) {
	
	return (
		<label className="h-7 w-12 rounded bg-sky-600 hover:bg-sky-500 active:bg-sky-700 hover:cursor-pointer">
			<input type="submit" onClick={submitFunc} value='LOG' className="hidden" />
			<ChevronDoubleRightIcon className="w-5 h-5 mx-auto mt-1"/>
		</label>
	)

}