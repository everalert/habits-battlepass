export default function ItemValue(props) {
	return (
		<span className="text-2xl align-center">
			<span>{props.value}</span>
			<span className="text-xl ml-1">{props.unit}</span>
		</span>
	);
}