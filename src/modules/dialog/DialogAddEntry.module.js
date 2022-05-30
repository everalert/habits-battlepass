import { Dialog } from '@headlessui/react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import InputChallenge from "../input/InputChallenge.module";
import InputGoal from "../input/InputGoal.module";
import InputLog from "../input/InputLog.module";

export default function DialogAddEntry({ isOpen, setIsOpen }) {

	const tabs = [
		{ name:'Season', content:(<>SEASON</>) },
		{ name:'Category', content:(<>CATEGORY</>) },
		{ name:'Activity', content:(<>ACTIVITY</>) },
		{ name:'Goal', content:(<InputGoal setParentOpen={setIsOpen} />) },
		{ name:'Challenge', content: <InputChallenge setParentOpen={setIsOpen} /> },
		{ name:'Log', content: <InputLog setParentOpen={setIsOpen} /> },
	]

	const [tab, setTab] = useState(0);
	const decrementTab = () => setTab((tab+tabs.length-1)%tabs.length);
	const incrementTab = () => setTab((tab+1)%tabs.length);
	
	const baseBtnStyle = 'mb-px px-3 py-1 text-center font-medium uppercase cursor-pointer'
	const sideBtnStyle = 'fill-zinc-500 hover:fill-zinc-400 active:fill-zinc-600 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800'
	const mainBtnStyle = 'bg-slate-600 hover:bg-slate-500 active:bg-slate-700'

	return (
		<Dialog open={isOpen} onClose={setIsOpen}>
			<Dialog.Overlay className="fixed inset-0 overflow-scroll backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 bg-zinc-700/50"/>
			<div className="fixed top-0 left-1/2 flex flex-col gap-4 -ml-48 my-8 w-96 bg-zinc-900 rounded-xl ring-2 ring-black/10">
				<h1 className="mx-4 mt-4 text-xl text-center uppercase font-bold">Add Entry</h1>
				<ul className="flex flex-wrap justify-center mx-4 divide-x divide-neutral-900 select-none">
					<li className="w-8 h-8 rounded-l-lg overflow-hidden" onClick={()=>decrementTab()}>
						<ChevronDoubleLeftIcon className={`w-12 h-12 -ml-[0.425rem] -mt-2 ${baseBtnStyle} ${sideBtnStyle}`} />
					</li>
					<li className={`w-28 ${baseBtnStyle} ${mainBtnStyle}`} onClick={()=>incrementTab()}>
						{tabs[tab].name}
					</li>
					<li className="w-8 h-8 rounded-r-lg overflow-hidden" onClick={()=>incrementTab()}>
						<ChevronDoubleRightIcon className={`w-12 h-12 -ml-[0.525rem] -mt-2 ${baseBtnStyle} ${sideBtnStyle}`} />
					</li>
				</ul>
				<div className="mx-4 mb-4 mt-2">
					{ tabs[tab].content }
				</div>
			</div>
		</Dialog>
	)

}