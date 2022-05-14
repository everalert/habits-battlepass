import ItemValue from '../../elements/item/ItemValue.element'

export default function StatPar(props) {
	 return (
		<div className="flex flex-col text-center">
			<ItemValue value={props.abs} unit={props.unit} />
			<div className='text-base -skew-x-12 -mt-1.5'>
				<span className="text-sm">PAR</span>
				<span className="ml-0.5">{props.rel>=0?'+':'-'}</span>
				<span className="text-lg">{props.rel}</span>
				<span className="ml-0.5">{props.unit}</span>
			</div>
		</div>
	);
}