import ItemFrac from '../../elements/item/ItemFrac.element';
import ItemNumber from '../../elements/item/ItemNumber.element';

export default function StatTaskProgress(props) {
	 return (
		<div className='text-center'>
			<ItemFrac over={props.over} under={props.under} />
			<span className='ml-2'>
				<span className='text-lg'><ItemNumber num={props.value} /></span>
				<span className='text-base ml-1'>{props.unit}</span>
			</span>
			<span className="block text-lg italic -mt-1.5">{props.label}</span>
		</div>
	);
}