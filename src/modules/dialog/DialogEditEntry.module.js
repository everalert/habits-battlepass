import { Dialog, Tab } from '@headlessui/react';
import { connect } from 'react-redux';
import InputActivityEdit from '../input/InputActivityEdit.module';
import InputCategoryEdit from '../input/InputCategoryEdit.module';
import InputChallengeEdit from '../input/InputChallengeEdit.module';
import InputGoalEdit from '../input/InputGoalEdit.module';
import InputLogEdit from '../input/InputLogEdit.module';
import InputSeasonEdit from '../input/InputSeasonEdit.module';


const mapStateToProps = (state, ownProps) => {
	return {
		firsts: {
			season:    state.data.season.seasons[0],
			category:  state.data.category.categories[0],
			activity:  state.data.activity.activities[0],
			goal:      state.data.goal.goals[0],
			challenge: state.data.challenge.challenges[0],
			log:       state.data.log.logs[0],
		},
		...ownProps
	}
}


function DialogEditEntry({ isOpen, setIsOpen, firsts }) {

	const tabs = [
		{ name:'Season',    content: <InputSeasonEdit setParentOpen={setIsOpen} /> },
		{ name:'Category',  content: <InputCategoryEdit setParentOpen={setIsOpen} /> },
		{ name:'Activity',  content: <InputActivityEdit setParentOpen={setIsOpen} /> },
		{ name:'Goal',      content: <InputGoalEdit setParentOpen={setIsOpen} /> },
		{ name:'Challenge', content: <InputChallengeEdit setParentOpen={setIsOpen} /> },
		{ name:'Log',       content: <InputLogEdit setParentOpen={setIsOpen} /> },
	]
	
	const baseBtnStyle = 'mb-px mx-px px-3 py-1 text-center font-medium uppercase cursor-pointer'
	const sideBtnStyle = 'fill-zinc-500 hover:fill-zinc-400 active:fill-zinc-600 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800'
	const mainBtnStyle = 'bg-slate-600 hover:bg-slate-500 active:bg-slate-700'

	return (
		<Dialog open={isOpen} onClose={setIsOpen}>
			<Dialog.Overlay className="fixed inset-0 backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 bg-zinc-700/50"/>
			<Tab.Group as='div' defaultIndex={tabs.length-1} className="fixed inset-y-0 left-1/2 flex flex-col gap-4 -ml-48 my-8 w-96 bg-zinc-900 rounded-xl ring-2 ring-black/10 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-zinc-800">
				<h1 className="mx-4 mt-4 text-xl text-center uppercase font-bold">Edit Entry</h1>
				<Tab.List className="flex flex-wrap justify-center mx-4 gap-0.5 select-none">
					{ tabs.map((t,i) => <Tab key={i}>
						{({ selected }) => <div className={`w-28 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>{t.name}</div>}
					</Tab>)}
				</Tab.List>
				<Tab.Panels className="mx-4 mb-4 mt-2">
					{ tabs.map((t,i) => 
						<Tab.Panel key={i}>{t.content}</Tab.Panel>
					) }
				</Tab.Panels>
			</Tab.Group>
		</Dialog>
	)

}

export default connect(mapStateToProps)(DialogEditEntry)