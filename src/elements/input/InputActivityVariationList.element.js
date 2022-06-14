import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	}
}


function InputActivityVariationList({ activity, setParentVariation }) {

	const extractVariations = (activity) => {
		const variations = activity.variations.split(',');
		if (!variations.includes(''))
			variations.unshift('');
		return variations;
	}
	const [variations, setVariations] = useState(extractVariations(activity))
	const [selectedVariation, setSelectedVariation] = useState(variations[0])

	useEffect(()=>{
		setVariations(extractVariations(activity))
	}, [activity]);

	useEffect(()=>{
		setSelectedVariation(variations[0]);
	}, [variations])
	
	useEffect(()=>{
		setParentVariation(selectedVariation);
	}, [selectedVariation]);

	return (
		<div className='relative text-zinc-900'>
			<Listbox value={selectedVariation} onChange={setSelectedVariation}>
				<Listbox.Button className='relative w-full cursor-pointer rounded bg-zinc-300 py-1 pl-3 pr-10 text-left ring-2 ring-black ring-opacity-5 focus:outline- sm:text-sm'>
					{ selectedVariation === '' ? 
						<span className='block truncate text-zinc-400'>None</span>
						: <span className='block truncate text-zinc-900'>{selectedVariation}</span>
					}
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base ring-2 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{variations.map((v, i) => (
						<Listbox.Option key={i} value={v} className={({ active }) => `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'}`}>
							{({ selected }) => (<>
								<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{v==='' ? 'NO VARIATION' : v}</span>
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

export default connect(mapStateToProps)(InputActivityVariationList);