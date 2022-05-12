export default function ItemValue(props) {
	return (
		<span className="statItemAbs">
			<span className="statItemValue">{props.value}</span>
			<span className="statItemUnit">{props.unit}</span>
		</span>
	);
}