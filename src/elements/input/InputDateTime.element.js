import { useEffect, useState } from "react";
import { clamp, GetCurrentUnixTimestamp, strPadZero as pad, strTruncToInt as cut } from '../../helpers/Math.helper';


export default function InputDateTime({ timestamp = GetCurrentUnixTimestamp(), setParentTimestamp }) {

	const daysInMonth = [ ()=>31, (y)=>y%4===0?29:28, ()=>31, ()=>30, ()=>31, ()=>30, ()=>31, ()=>31, ()=>30, ()=>31, ()=>30, ()=>31 ]

	const [date, setDate] = useState(new Date(timestamp*1000))

	const setDateYYYY = (YYYY) => {
		let newDate = new Date(date);
		newDate.setDate(Math.min(daysInMonth[date.getMonth()](date.getFullYear()), date.getDate()));
		newDate.setFullYear(cut(YYYY, 4));
		setDate(newDate);
	};
	const setDateMM = (MM) => {
		const newM = clamp(cut(MM,2)-1, 0, 11);
		let newDate = new Date(date);
		newDate.setDate(Math.min(daysInMonth[newM](date.getFullYear()), date.getDate()));
		newDate.setMonth(newM);
		setDate(newDate);
	};
	const setDateDD = (DD) => {
		let newDate = new Date(date);
		newDate.setDate(Math.min(daysInMonth[date.getMonth()](date.getFullYear()), cut(DD, 2)));
		setDate(newDate);
	};
	const setDateH = (h) => {
		let newDate = new Date(date);
		newDate.setHours(cut(h, 2));
		setDate(newDate);
	};
	const setDateM = (m) => {
		let newDate = new Date(date);
		newDate.setMinutes(cut(m, 2));
		setDate(newDate);
	};
	const setDateS = (s) => {
		let newDate = new Date(date);
		newDate.setSeconds(cut(s, 2));
		setDate(newDate);
	};

	useEffect(() => {
		setParentTimestamp(date.getTime()/1000);
	}, [date]);

	useEffect(()=>{
		setDate(new Date(timestamp*1000))
	}, [timestamp])

	return (
		<label className="h-7 mr-auto flex items-center gap-0.5 px-2 rounded font-mono text-zinc-600 caret-zinc-500 bg-zinc-300">
			<input type="text" placeholder="Y" value={pad(date.getFullYear(),4)} onChange={(e)=>setDateYYYY(e.target.value)} className="w-8 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />/
			<input type="text" placeholder="M" value={pad(date.getMonth()+1,2)} onChange={(e)=>setDateMM(e.target.value)} className="w-4 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />/
			<input type="text" placeholder="D" value={pad(date.getDate(),2)} onChange={(e)=>setDateDD(e.target.value)} className="w-4 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
			<input type="text" placeholder="H" value={pad(date.getHours(),2)} onChange={(e)=>setDateH(e.target.value)} className="ml-2 w-4 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
			<input type="text" placeholder="M" value={pad(date.getMinutes(),2)} onChange={(e)=>setDateM(e.target.value)} className="w-4 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
			<input type="text" placeholder="S" value={pad(date.getSeconds(),2)} onChange={(e)=>setDateS(e.target.value)} className="w-4 mt-0.5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
		</label>
	)

}