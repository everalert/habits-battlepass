export default function TaskChallenge(props) {
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
				<span className="clear-left block bg-gray-800 w-full h-2"></span>
			</div>
		</div>
	);
}