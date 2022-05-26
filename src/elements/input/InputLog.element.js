import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDoubleRightIcon, PlusIcon, RefreshIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { GetCurrentUnixTimestamp } from '../../helpers/Math.helper';
import { PrepareNewLog } from "../../redux/helpers/Log.helper";
import { addLog } from '../../redux/slices/Log.slice';


const mapStateToProps = (state, ownProps) => {
	return {
		activities: state.activity.activities,
		...ownProps
	}
}


function InputLog({ activities, setParentOpen }) {

	const dispatch = useDispatch();
	const blankLog = PrepareNewLog();

	const [selectedActivity, setSelectedActivity] = useState(activities[0]);

	const [isTimeTask, setIsTimeTask] = useState(selectedActivity.type === 'time');

	const extractVariations = (activity) => activity.variations.split(',')
	const [variations, setVariations] = useState(extractVariations(selectedActivity))
	const [selectedVariation, setSelectedVariation] = useState(variations[0])
	
	useEffect(()=>{
		setVariations(extractVariations(selectedActivity));
		setIsTimeTask(selectedActivity.type === 'time')
	}, [selectedActivity]);

	useEffect(()=>{
		setSelectedVariation(variations[0]);
	}, [variations]);

	const [timestamp, setTimestamp] = useState(GetCurrentUnixTimestamp())
	const dateopts = ['now','-1d','-2d','-7d','-14d','other']
	const dateoptToTimestamp = (opt) => {
		switch (opt) {
			case 'now': return GetCurrentUnixTimestamp();
			case '-1d': return GetCurrentUnixTimestamp()-86400;
			case '-2d': return GetCurrentUnixTimestamp()-172800;
			case '-7d': return GetCurrentUnixTimestamp()-604800;
			case '-14d': return GetCurrentUnixTimestamp()-1209600;
			case 'other':
			default: return timestamp;
		}
	}
	const [datefill, setDatefill] = useState(0);
	const incDatefill = () => setDatefill((datefill+1)%dateopts.length);
	const makeDateInput = (timestamp) => {
		return {
			YYYY: (new Date(timestamp*1000)).getFullYear(),
			MM: (new Date(timestamp*1000)).getMonth()+1,
			DD: (new Date(timestamp*1000)).getDate(),
			h: (new Date(timestamp*1000)).getHours(),
			m: (new Date(timestamp*1000)).getMinutes(),
			s: (new Date(timestamp*1000)).getSeconds(),
		}
	}
	const [dateInput, setDateInput] = useState(makeDateInput(dateoptToTimestamp(datefill)));
	const setDateNumber = (value, field) => {
		let changes = {...dateInput};
		changes[field] = value.replace(/[^0-9]+/g, '');
		setDateInput(changes);
	}
	const setDateYYYY = (YYYY) => setDateNumber(YYYY, 'YYYY');
	const setDateMM = (MM) => setDateNumber(MM, 'MM');
	const setDateDD = (DD) => setDateNumber(DD, 'DD');
	const setDateH = (h) => setDateNumber(h, 'h');
	const setDateM = (m) => setDateNumber(m, 'm');
	const setDateS = (s) => setDateNumber(s, 's');

	useEffect(() => {
		setDateInput(makeDateInput(dateoptToTimestamp(dateopts[datefill]), true));
	}, [datefill]);

	useEffect(() => {
		const date = new Date(
			parseInt(dateInput.YYYY),
			parseInt(dateInput.MM)-1,
			parseInt(dateInput.DD),
			parseInt(dateInput.h),
			parseInt(dateInput.m),
			parseInt(dateInput.s)
		);
		setTimestamp(date.getTime()/1000);
	}, [dateInput]);

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
	const incCount = () => setNumberValue((inputValue.count===''?1:parseFloat(inputValue.count)+1).toString(), 'count');
	const setH = (h) => setNumberValue(h, 'h');
	const setM = (m) => setNumberValue(m, 'm');
	const setS = (s) => setNumberValue(s, 's');
	const setMs = (ms) => setNumberValue(ms, 'ms');

	const resetForm = () => {
		setSelectedActivity(activities[0]);
		setDatefill(0);
		setCount('');
	}

	const submitForm = (event) => {
		let activity = selectedActivity
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
				variation: selectedVariation
			});
			dispatch(addLog(newLog));
			resetForm();
			setParentOpen(false);
		}
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<h2 className='-mb-1.5'>Activity</h2>
			<div className='relative text-zinc-900'>
				<Listbox value={selectedActivity} onChange={setSelectedActivity}>
					<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 text-left font-medium shadow-md focus:outline- sm:text-sm'>
						<span className="block truncate">{selectedActivity.label}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Listbox.Options className='absolute mt-1 max-h-32 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{activities.map((a) => (
							<Listbox.Option key={a.id} value={a} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
								{({ selected }) => (<>
									<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{a.label}</span>
									{selected && (
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
											<CheckIcon className="h-5 w-5" aria-hidden="true" />
										</span>
									)}
								</>)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Listbox>
			</div>
			<h2 className='-mb-1.5'>Date & Time</h2>
			<div className='flex gap-1'>
				<label className="h-7 flex items-center gap-0.5 px-2 rounded text-zinc-600 caret-zinc-500 bg-zinc-300">
					<input type="text" placeholder="Y" value={dateInput.YYYY} onChange={(e)=>setDateYYYY(e.target.value)} className="w-9 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />/
					<input type="text" placeholder="M" value={dateInput.MM} onChange={(e)=>setDateMM(e.target.value)} className="w-5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />/
					<input type="text" placeholder="D" value={dateInput.DD} onChange={(e)=>setDateDD(e.target.value)} className="w-5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
					<input type="text" placeholder="H" value={dateInput.h} onChange={(e)=>setDateH(e.target.value)} className="ml-2 w-5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
					<input type="text" placeholder="M" value={dateInput.m} onChange={(e)=>setDateM(e.target.value)} className="w-5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
					<input type="text" placeholder="S" value={dateInput.s} onChange={(e)=>setDateS(e.target.value)} className="w-5 placeholder:text-zinc-400 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
				</label>
				<div onClick={incDatefill} className="h-7 w-20 pt-1 text-center font-bold uppercase bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer rounded aspect-square select-none">{ dateopts[datefill] }</div>
			</div>
			{ !isTimeTask &&
				<>
					<h2 className='-mb-1.5'>Amount</h2>
					<div className='flex gap-1'>
						<label className="w-24 h-7 flex items-center gap-0.5 px-0.5 rounded text-zinc-600 caret-zinc-500 bg-zinc-300">
							<input type="text" placeholder="amount" value={inputValue.count} onChange={(e)=>setCount(e.target.value)} className="w-20 mx-2 bg-transparent focus:outline-none focus:text-zinc-900 placeholder:text-zinc-400 text-center" />
						</label>
						<label className="h-7 w-7 bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer rounded aspect-square">
							<input type="button" onClick={()=>incCount()} value='+1' className="hidden" />
							<PlusIcon className="w-5 h-5 mx-auto mt-1"/>
						</label>
					</div>
				</>
			}
			{ isTimeTask &&
				<>
					<h2 className='-mb-1.5'>Duration</h2>
					<label className="h-7 flex items-center gap-0.5 px-0.5 mr-auto rounded text-zinc-500 caret-zinc-400 bg-zinc-200">
						<input type="text" placeholder="H" value={inputValue.h} onChange={(e)=>setH(e.target.value)} className="w-10 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
						<input type="text" placeholder="M" value={inputValue.m} onChange={(e)=>setM(e.target.value)} className="w-8 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />:
						<input type="text" placeholder="S" value={inputValue.s} onChange={(e)=>setS(e.target.value)} className="w-8 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />.
						<input type="text" placeholder="ms" value={inputValue.ms} onChange={(e)=>setMs(e.target.value)} className="w-10 bg-transparent focus:outline-none focus:text-zinc-900 text-center" />
					</label>
				</>
			}
			<h2 className='-mb-1.5'>Variation</h2>
			<div className='relative text-zinc-900'>
				<Listbox value={selectedVariation} onChange={setSelectedVariation}>
					<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 text-left shadow-md focus:outline- sm:text-sm'>
					{ variations[0] === '' ? 
						<span className='block truncate text-zinc-400'>No Variations Available</span>
						: <span className='block truncate text-zinc-900'>{selectedVariation}</span>
					}
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</span>
					</Listbox.Button>
					{ variations[0] !== '' &&
						<Listbox.Options className='absolute mt-1 max-h-32 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{variations.map((v, i) => (
								<Listbox.Option key={i} value={v} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
									{({ selected }) => (<>
										<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{v}</span>
										{selected && (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					}
				</Listbox>
			</div>
			<div className='flex gap-3 ml-auto mt-1'>
				<label className="h-7 w-7 rounded-full bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 hover:cursor-pointer">
					<input type="button" onClick={resetForm} value='RESET' className="hidden" />
					<RefreshIcon className="w-5 h-5 mx-auto mt-1"/>
				</label>
				<label className="h-7 w-12 rounded bg-sky-500 hover:bg-sky-800 active:bg-sky-900 hover:cursor-pointer">
					<input type="submit" onClick={()=>setButtonValue('LOG')} value='LOG' className="hidden" />
					<ChevronDoubleRightIcon className="w-5 h-5 mx-auto mt-1"/>
				</label>
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputLog);