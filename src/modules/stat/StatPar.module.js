import ItemValue from '../../elements/item/ItemValue.element'
import ItemNumber from '../../elements/item/ItemNumber.element';


export default function StatPar({abs, rel, relRaw, relDir, unit, absDecimals = 0, relDecimals = 0}) {

	const dir = relDir >= 0;
	const relColor = (dir, relRaw) => dir ? (relRaw>=0?'text-green-200':'text-red-200') : (relRaw>=0?'text-red-200':'text-green-200');
	const relSign = (dir, relRaw) => (dir ? relRaw >= 0 : relRaw > 0) ? '+' : '-'

	return (
		<div className="flex flex-col text-center">
			<ItemValue value={abs} unit={unit} decimals={absDecimals} />
			<div className={`text-base -skew-x-12 -mt-1.5  ${relColor(dir, relRaw)}`}>
				<span className="text-sm">PAR</span>
				<span className='ml-0.5'>{relSign(dir, relRaw)}</span>
				<span className="text-lg"><ItemNumber num={typeof rel === 'number' ? Math.abs(rel) : rel} decimals={relDecimals} /></span>
				<span className="ml-0.5">{unit}</span>
			</div>
		</div>
	)

}