import { Dialog, Tab } from '@headlessui/react';
import InputActivity from '../input/InputActivity.module';
import InputCategory from '../input/InputCategory.module';
import InputChallenge from "../input/InputChallenge.module";
import InputGoal from "../input/InputGoal.module";
import InputLog from "../input/InputLog.module";
import InputSeason from '../input/InputSeason.module';

export default function DialogAddEntry({ isOpen, setIsOpen }) {

	const tabs = [
		{ name:'Season',    content: <InputSeason setParentOpen={setIsOpen} /> },
		{ name:'Category',  content: <InputCategory setParentOpen={setIsOpen} /> },
		{ name:'Activity',  content: <InputActivity setParentOpen={setIsOpen} /> },
		{ name:'Goal',      content: <InputGoal setParentOpen={setIsOpen} /> },
		{ name:'Challenge', content: <InputChallenge setParentOpen={setIsOpen} /> },
		{ name:'Log',       content: <InputLog setParentOpen={setIsOpen} /> },
	]
	
	const baseBtnStyle = 'mb-px mx-px px-3 py-1 text-center font-medium uppercase cursor-pointer'
	const sideBtnStyle = 'fill-zinc-500 hover:fill-zinc-400 active:fill-zinc-600 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800'
	const mainBtnStyle = 'bg-slate-600 hover:bg-slate-500 active:bg-slate-700'

	return (
		<Dialog open={isOpen} onClose={setIsOpen}>
			<Dialog.Overlay className="fixed inset-0 backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 bg-zinc-700/50"/>
			<Tab.Group as='div' defaultIndex={tabs.length-1} className="fixed inset-y-0 left-1/2 flex flex-col gap-4 -ml-48 my-8 w-96 bg-zinc-900 rounded-xl ring-2 ring-black/10 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-zinc-800">
				<h1 className="mx-4 mt-4 text-xl text-center uppercase font-bold">Add Entry</h1>
				<Tab.List className="flex flex-wrap justify-center mx-4 gap-0.5 select-none">
					{ tabs.map((t,i) => <Tab key={i}>
						{({ selected }) => <div className={`w-28 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>{t.name}</div>}
					</Tab>)}
				</Tab.List>
				<Tab.Panels className="mx-4 mb-4 mt-2">
					{ tabs.map((t,i) => <Tab.Panel key={i}>{t.content}</Tab.Panel>) }
				</Tab.Panels>
			</Tab.Group>
		</Dialog>
	)

}