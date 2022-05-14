export default function TaskChallenge(props) {
	const progress = props.over/props.under*100;
	return (
		<div className="clear-both flex flex-row-reverse gap-x-2">
			<div className="text-lg font-medium text-zinc-400 bg-zinc-900 rounded-md text-center tracking-tighter w-16 h-8 pt-[0.08rem] shrink-0">{props.reward.toLocaleString(undefined)}</div>
			<div className="flex-grow relative">
				<span className="tracking-tighter block float-left h-6 overflow-hidden">{props.label}</span>
				<span className="text-sm absolute top-0 right-0 pl-8 bg-gradient-to-r from-transparent via-black to-black">
					<span className="text-base font-bold">{props.over}</span>
					<span>/</span>
					<span>{props.under}</span>
				</span>
				<div className="bg-zinc-900 w-full mt-[1.625rem] h-1.5 -skew-x-[24deg] overflow-hidden relative">
					<div
						className='bg-zinc-500 w-full h-full absolute'
						style={{left:`${-100+progress}%`}}></div>
				</div>
			</div>
		</div>
	);
}