import ItemValue from '../../elements/item/ItemValue.element'
import ItemNumber from '../../elements/item/ItemNumber.element';

export default function StatPar({abs, rel, relRaw, unit}) {
	 return (
		<div className="flex flex-col text-center">
			<ItemValue value={abs} unit={unit} />
			<div className='text-base -skew-x-12 -mt-1.5'>
				<span className="text-sm">PAR</span>
				<span className="ml-0.5">{relRaw >= 0 ? '+' : '-'}</span>
				<span className="text-lg"><ItemNumber num={typeof rel === 'number' ? Math.round(Math.abs(rel)*10)/10 : rel} /></span>
				<span className="ml-0.5">{unit}</span>
			</div>
		</div>
	);
}