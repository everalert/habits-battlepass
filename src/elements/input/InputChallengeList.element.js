import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getListsFromDataState } from '../../redux/data/Data.helpers';
import { ActivityValueString } from '../../redux/helpers/Activity.helpers';


const mapStateToProps = (state, ownProps) => {
	const { challenges, activities, goals, seasons, categories } = getListsFromDataState(state.data);
	return {
		challenges,
		activities,
		goals,
		seasons,
		categories,
		...ownProps
	}
}


function InputChallengeList({ challenges, activities, goals, seasons, categories, selectedChallenge, setParentChallenge }) {

	useEffect(()=>{
		if (!challenges.includes(selectedChallenge))
			setParentChallenge(challenges[0]);
	}, [challenges])

	const label = (challenge) => {
		const a = activities.find(a => a.id === challenge.taskActivityId);
		return `${
			challenge.taskLabel
				.replace('{UNIT}', ActivityValueString(a, challenge.taskAmount))
				.replace('{ACTIVITY}', a.label)
		}`
	}

	const sublabel = (challenge) => {
		const g = goals.find(g => g.id === challenge.goalId);
		const s = seasons.find(s => s.id === g.seasonId);
		const c = categories.find(c => c.id === g.categoryId);
		return `${s.title} - ${c.name}`
	}
	
	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedChallenge} onChange={setParentChallenge}>
				<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 ring-2 ring-black ring-opacity-5 text-left font-medium focus:outline- sm:text-sm'>
					<span className="block truncate">{label(selectedChallenge)}</span>
					<span className="block truncate text-xs font-normal uppercase">{sublabel(selectedChallenge)}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{challenges.map((c) => (
						<Listbox.Option key={c.id} value={c} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
							{({ selected }) => (<>
								<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{label(c)}</span>
								<span className={`block truncate text-xs text-zinc-400 uppercase ${selected ? 'font-medium' : 'font-normal'}`}>{sublabel(c)}</span>
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

export default connect(mapStateToProps)(InputChallengeList);