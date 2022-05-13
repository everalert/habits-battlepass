export default function ItemDelta(props) {
	return (
		<span className='text-base -skew-x-12'>
			<span className="text-sm">{props.label}</span>
			<span className="ml-0.5">{props.value>=0?'+':'-'}</span>
			<span className="text-lg">{props.value}</span>
			<span className="ml-0.5">{props.unit}</span>
		</span>
	);
}