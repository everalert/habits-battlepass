import ItemFrac from '../../elements/item/ItemFrac.element';

export default function StatTaskProgress(props) {
	 return (
		<div className='text-center'>
			<ItemFrac over={props.over} under={props.under} />
			<span className='ml-2'>
				<span className='text-lg'>{props.value}</span>
				<span className='text-base ml-1'>{props.unit}</span>
			</span>
			<span className="block text-lg">{props.label}</span>
		</div>
	);
}