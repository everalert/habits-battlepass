import { PlusIcon } from '@heroicons/react/solid';


export default function InputAmountIncrementButton({ amount, setParentAmount }) {

	const increment = () => setParentAmount(amount+1);

	return (
		<label className="h-7 w-7 bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer rounded aspect-square select-none">
			<input type="button" onClick={increment} value='+1' className="hidden" />
			<PlusIcon className="w-5 h-5 mx-auto mt-1"/>
		</label>
	)

}