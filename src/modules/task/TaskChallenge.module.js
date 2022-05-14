export default function TaskChallenge(props) {
	const progress = props.over/props.under*100;
	return (
		<div className="clear-both flex flex-row-reverse gap-x-2">
			<div className="text-lg font-bold text-center tracking-tighter block w-16 h-8 bg-gray-500 shrink-0">{props.reward}</div>
			<div className="flex-grow">
				<span className="tracking-tighter float-left">{props.label}</span>
				<span className="text-sm float-right">
					<span className="text-base font-bold">{props.over}</span>
					<span>/</span>
					<span>{props.under}</span>
				</span>
				<div className="bg-zinc-900 clear-left w-full mt-[1.625rem] h-1.5 -skew-x-[24deg] overflow-hidden">
					<div
						className='bg-zinc-500 w-full h-full absolute'
						style={{left:`${-100+progress}%`}}></div>
				</div>
			</div>
		</div>
	);
}