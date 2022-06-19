import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { GetTimeString } from '../../helpers/Math.helper';
import { ActivityValueString } from '../../redux/helpers/Activity.helpers';


const mapStateToProps = (state, ownProps) => {
	return {
		logs: [...state.data.log.logs].sort((a,b) => b.timestamp - a.timestamp),
		activity: state.data.activity.activities.find(a => a.id === ownProps.selectedLog.activityId),
		activities: state.data.activity.activities,
		...ownProps
	}
}


function InputLogList({ logs, activity, activities, selectedLog, setParentLog }) {

	const sortedLogs = useMemo(() => logs.sort((a,b) => b.timestamp - a.timestamp), [logs]);

	const parseTime = (timestamp) => GetTimeString(timestamp, true);

	useEffect(()=>{
		if (!logs.includes(selectedLog))
			setParentLog(logs[0]);
	}, [logs])
	
	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedLog} onChange={setParentLog}>
				<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 ring-2 ring-black ring-opacity-5 text-left font-medium focus:outline- sm:text-sm'>
					<span className="block truncate">{`${ActivityValueString(activity, selectedLog.value)}`}<span className='text-xs ml-2 text-zinc-400 uppercase'>{activity.label}</span></span>
					<span className="block truncate text-xs font-normal">{`${parseTime(selectedLog.timestamp)}`}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{sortedLogs.map((l) => {
						const a = activities.find(a => a.id === l.activityId);
						return (
							<Listbox.Option key={l.id} value={l} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
								{({ selected }) => (<>
									<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{`${ActivityValueString(a, l.value)}`}<span className='text-xs ml-2 text-zinc-400 uppercase'>{a.label}</span></span>
									<span className={`block truncate text-xs text-zinc-600 ${selected ? 'font-medium' : 'font-normal'}`}>{`${parseTime(l.timestamp)}`}</span>
									{selected && (
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
											<CheckIcon className="h-5 w-5" aria-hidden="true" />
										</span>
									)}
								</>)}
							</Listbox.Option>
						)
					})}
				</Listbox.Options>
			</Listbox>
		</div>
	)

}

export default connect(mapStateToProps)(InputLogList);