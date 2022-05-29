import { strToFloat } from "../../helpers/Math.helper";


export default function InputAmount({ amount, setParentAmount, onFocus, onBlur }) {

	const setAmount = (value) => {
		setParentAmount(strToFloat(value));
	}

	return (
		<label className="h-7 w-20 flex items-center gap-0.5 px-1 rounded font-mono text-zinc-600 caret-zinc-500 bg-zinc-300">
			<input type="text" placeholder="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-full mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 placeholder:text-zinc-400 text-center" />
		</label>
	)

}