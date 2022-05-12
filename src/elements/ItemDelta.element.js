import ItemValue from "./ItemValue.element";

export default function ItemDelta(props) {
	return (
		<span className="statItemPar">
			<span className="statItemText">{props.label}</span>
			<span className="statItemSign">{props.value>=0?'+':'-'}</span>
			<ItemValue value={Math.abs(props.value)} unit={props.unit} />
		</span>
	);
}