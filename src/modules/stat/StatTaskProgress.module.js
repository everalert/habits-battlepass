import ItemValue from '../../elements/item/ItemValue.element'
import ItemFrac from '../../elements/item/ItemFrac.element';

export default function StatTaskProgress(props) {
	 return (
		<div className="statItem">
			<ItemFrac over={props.over} under={props.under} />
			<ItemValue value={props.value} unit={props.unit}/>
			<span className="statItemLabel">{props.label}</span>
		</div>
	);
}