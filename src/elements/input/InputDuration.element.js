import { useEffect, useState } from "react";
import { SecondsToTimeObject, strPadZero as pad, strTruncToInt, TimeObjectToSeconds } from "../../helpers/Math.helper";


export default function InputDuration({ timestamp, setParentTimestamp, showDay, onFocus, onBlur }) {

	const len = { d:0, h:3, m:2, s:2, ms:3 }

	const [inputValue, setInputValue] = useState(SecondsToTimeObject(timestamp))
	const setNumberValue = (value, field) => {
		let changes = {...inputValue};
		changes[field] = strTruncToInt(value, len[field]);
		setInputValue(changes);
	}
	const setD = (d) => setNumberValue(d, 'd');
	const setH = (h) => setNumberValue(h, 'h');
	const setM = (m) => setNumberValue(m, 'm');
	const setS = (s) => setNumberValue(s, 's');
	const setMs = (ms) => setNumberValue(ms, 'ms');

	useEffect(()=>{ 
		setParentTimestamp(TimeObjectToSeconds(inputValue));
	}, [inputValue]);

	useEffect(()=>{
		setInputValue(SecondsToTimeObject(timestamp));
	}, [timestamp]);

	return (
		<label className="h-7 flex items-center gap-1 px-2 mr-auto rounded font-mono text-zinc-500 caret-zinc-400 bg-zinc-200">
			{ showDay ? <>
				<input type="text" placeholder="D" value={pad(inputValue.d,len.d,' ')} onChange={(e)=>setD(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-6 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />D,
				<input type="text" placeholder="H" value={pad(inputValue.h,len.h-1,' ')} onChange={(e)=>setH(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-4 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
			</> : <>
				<input type="text" placeholder="H" value={pad(inputValue.h+inputValue.d*24,len.h,' ')} onChange={(e)=>setH(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-8 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
			</> }
			<input type="text" placeholder="M" value={pad(inputValue.m,len.m)} onChange={(e)=>setM(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-4 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
			<input type="text" placeholder="S" value={pad(inputValue.s,len.s)} onChange={(e)=>setS(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-4 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />.
			<input type="text" placeholder="ms" value={pad(inputValue.ms,len.ms)} onChange={(e)=>setMs(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-6 mt-0.5 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
		</label>
	)

}