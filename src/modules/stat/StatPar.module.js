import ItemValue from '../../elements/item/ItemValue.element'
import ItemDelta from '../../elements/item/ItemDelta.element'

export default function StatPar(props) {
	 return (
		<div className="statItem">
			<ItemValue value={props.abs} unit={props.unit} />
			<ItemDelta label='PAR' value={props.rel} unit={props.unit} />
		</div>
	);
}