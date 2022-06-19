import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityValueString } from '../../redux/helpers/Activity.helpers';


const mapStateToProps = (state, ownProps) => {
	return {
		goals: state.data.goal.goals,
		activity: state.data.activity.activities.find(a => a.id === ownProps.selectedGoal.goalLagActivityId),
		activities: state.data.activity.activities,
		season: state.data.season.seasons.find(s => s.id === ownProps.selectedGoal.seasonId),
		seasons: state.data.season.seasons,
		...ownProps
	}
}


function InputGoalList({ goals, activity, activities, season, seasons, selectedGoal, setParentGoal }) {

	useEffect(()=>{
		if (!goals.includes(selectedGoal))
			setParentGoal(goals[0]);
	}, [goals])
	
	const label = (g, a) => <>
		{`${ActivityValueString(a, g.goalLagStartValue)} to ${ActivityValueString(a, g.goalLagEndValue)}`}
		<span className='text-xs ml-2 text-zinc-400 uppercase'>{a.label}</span>
	</>

	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedGoal} onChange={setParentGoal}>
				<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 ring-2 ring-black ring-opacity-5 text-left font-medium focus:outline- sm:text-sm'>
					<span className="block truncate">{label(selectedGoal, activity)}</span>
					<span className="block truncate text-xs font-normal uppercase">{season.title}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{goals.map((g) => {
						const a = activities.find(a => a.id === g.goalLagActivityId);
						const s = seasons.find(s => s.id === g.seasonId);
						return (
							<Listbox.Option key={g.id} value={g} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
								{({ selected }) => (<>
									<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{label(g, a)}</span>
									<span className={`block truncate text-xs text-zinc-400 uppercase ${selected ? 'font-medium' : 'font-normal'}`}>{s.title}</span>
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

export default connect(mapStateToProps)(InputGoalList);