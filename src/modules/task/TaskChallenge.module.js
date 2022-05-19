import ItemNumber from "../../elements/item/ItemNumber.element";

export default function TaskChallenge({reward, label, progress, target, completionRate}) {
	return (
		<div className="clear-both flex flex-row-reverse gap-x-2">
			<div className="text-lg font-medium text-zinc-400 bg-zinc-900 rounded-md text-center tracking-tighter w-16 h-8 pt-[0.08rem] shrink-0"><ItemNumber num={reward} /></div>
			<div className="flex-grow relative">
				<span className="tracking-tighter block float-left h-6 overflow-hidden">{label}</span>
				<span className="text-sm absolute top-0 right-0 pl-8 bg-gradient-to-r from-transparent via-black to-black">
					<span className="text-base font-bold"><ItemNumber num={progress} /></span>
					<span>/</span>
					<span><ItemNumber num={target} /></span>
				</span>
				<div className="bg-zinc-900 w-full mt-[1.625rem] h-1.5 rounded -skew-x-[24deg] overflow-hidden relative">
					<div
						className='bg-zinc-500 w-full h-full absolute rounded-sm'
						style={{left:`${-100+completionRate}%`}}></div>
				</div>
			</div>
		</div>
	);
}