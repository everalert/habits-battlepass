import { ChevronDoubleRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { PrepareNewLog } from "../../redux/helpers/Log.helper";
import { addLog } from '../../redux/slices/Log.slice';


export default function InputQuickLog({ activity, variation }) {

	const dispatch = useDispatch();
	const blankLog = PrepareNewLog();

	const [isFocused, updateFocusedState] = useState(false);
	const focus = () => updateFocusedState(true);
	const unfocus = () => updateFocusedState(false);

	const [isTimeTask, setTimeTask] = useState(activity.type === 'time');
	
	const inputValueDefault = { count:'', h:'', m:'', s:'', ms:'', button:'' }
	const [inputValue, setInputValue] = useState(inputValueDefault)
	const setNumberValue = (value, field) => {
		let changes = {...inputValue};
		changes[field] = value.replace(/[^0-9]+/g, '');
		setInputValue(changes);
	}
	const setButtonValue = (value) => {
		let changes = {...inputValue};
		changes['button'] = value;
		setInputValue(changes);
	}
	const setCount = (count) => setNumberValue(count, 'count');
	const setH = (h) => setNumberValue(h, 'h');
	const setM = (m) => setNumberValue(m, 'm');
	const setS = (s) => setNumberValue(s, 's');
	const setMs = (ms) => setNumberValue(ms, 'ms');

	const submitForm = (event) => {
		event.preventDefault();
		const { count, h, m, s, ms, button } = inputValue;

		let value = 0;
		if (button === '+1' && !isTimeTask)
			value += 1;
		else if (isTimeTask)
			value += (h!==''?parseInt(h):0)*3600 + (m!==''?parseInt(m):0)*60 + (s!==''?parseInt(s):0) + (ms!==''?parseInt(ms):0)/1000;
		else
			value += (count!==''?parseInt(count):0);

		if ((activity.isReportingIncremental && value > 0) || !activity.isReportingIncremental) {
			const newLog = Object.assign(blankLog,{
				activityId: activity.id,
				value: value,
				variation: variation
			});
			dispatch(addLog(newLog));
			setInputValue({...inputValueDefault});
			unfocus();
		}
	}

	return (
		<form onSubmit={submitForm} className={`h-7 text-sm flex justify-center gap-2 absolute inset-x-0.5 transition-all top-1/2 ${isFocused ? '-mt-4 opacity-100' : '-mt-3 opacity-0 group-hover:-mt-4 group-hover:opacity-100'}`}>
			<div className="flex rounded-md overflow-hidden">
				{ !isTimeTask &&
					<label className="flex items-center gap-0.5 px-0.5 text-zinc-500 caret-zinc-400 bg-zinc-200">
						<input type="text" placeholder="amount" value={inputValue.count} onChange={(e)=>setCount(e.target.value)} onFocus={focus} onBlur={unfocus} className="w-20 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
					</label>
				}
				{ isTimeTask &&
					<label className="flex items-center gap-0.5 px-0.5 text-zinc-500 caret-zinc-400 bg-zinc-200">
						<input type="text" placeholder="H" value={inputValue.h} onChange={(e)=>setH(e.target.value)} onFocus={focus} onBlur={unfocus} className="w-10 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
						<input type="text" placeholder="M" value={inputValue.m} onChange={(e)=>setM(e.target.value)} onFocus={focus} onBlur={unfocus} className="w-8 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
						<input type="text" placeholder="S" value={inputValue.s} onChange={(e)=>setS(e.target.value)} onFocus={focus} onBlur={unfocus} className="w-8 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />.
						<input type="text" placeholder="ms" value={inputValue.ms} onChange={(e)=>setMs(e.target.value)} onFocus={focus} onBlur={unfocus} className="w-10 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
					</label>
				}
				<label className="bg-sky-500 hover:bg-sky-800 active:bg-sky-900 hover:cursor-pointer">
					<input type="submit" onClick={()=>setButtonValue('LOG')} value='LOG' className="hidden" />
					<ChevronDoubleRightIcon className="w-5 h-5 mx-2 mt-1"/>
				</label>
			</div>
			{ !isTimeTask && 
				<label className="bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer rounded-md aspect-square">
					<input type="submit" onClick={()=>setButtonValue('+1')} value='+1' className="hidden" />
					<PlusIcon className="w-5 h-5 mx-auto mt-1"/>
				</label>
			}
		</form>
	)

}