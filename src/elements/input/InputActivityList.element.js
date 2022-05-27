import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
	return {
		activities: state.activity.activities,
		...ownProps
	}
}


function InputActivityList({ activities, selectedActivity, setParentActivity }) {
	
	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedActivity} onChange={setParentActivity}>
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
	)

}

export default connect(mapStateToProps)(InputActivityList);