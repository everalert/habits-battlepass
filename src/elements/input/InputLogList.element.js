import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
	return {
		logs: [...state.data.log.logs].sort((a,b) => b.timestamp - a.timestamp),
		...ownProps
	}
}


function InputLogList({ logs, selectedLog, setParentLog }) {

	const sortedLogs = useMemo(() => logs.sort((a,b) => b.timestamp - a.timestamp), [logs]);

	useEffect(()=>{
		if (!logs.includes(selectedLog))
			setParentLog(logs[0]);
	}, [logs])
	
	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedLog} onChange={setParentLog}>
				<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 ring-2 ring-black ring-opacity-5 text-left font-medium focus:outline- sm:text-sm'>
					<span className="block truncate">{`${selectedLog.timestamp} - ${selectedLog.value}`}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{sortedLogs.map((l) => (
						<Listbox.Option key={l.id} value={l} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
							{({ selected }) => (<>
								<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{`${l.timestamp} - ${l.value}`}</span>
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
	)

}

export default connect(mapStateToProps)(InputLogList);