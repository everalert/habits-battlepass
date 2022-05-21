import ItemValue from '../../elements/item/ItemValue.element'
import ItemNumber from '../../elements/item/ItemNumber.element';

export default function StatPar({abs, rel, relRaw, relDir, unit}) {
	const dir = relDir >= 0;
	const relColor = dir ? (relRaw>=0?'text-green-200':'text-red-200') : (relRaw>=0?'text-red-200':'text-green-200');
	return (
		<div className="flex flex-col text-center">
			<ItemValue value={abs} unit={unit} />
			<div className={`text-base -skew-x-12 -mt-1.5  ${relColor}`}>
				<span className="text-sm">PAR</span>
				<span className='ml-0.5'>{(dir ? relRaw >= 0 : relRaw > 0) ? '+' : '-'}</span>
				<span className="text-lg"><ItemNumber num={typeof rel === 'number' ? Math.abs(rel) : rel} /></span>
				<span className="ml-0.5">{unit}</span>
			</div>
		</div>
	);
}