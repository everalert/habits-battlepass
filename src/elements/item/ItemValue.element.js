import ItemNumber from "./ItemNumber.element";


export default function ItemValue({ value, unit, decimals }) {
	return (
		<span className="text-2xl align-center">
			<span><ItemNumber num={value} decimals={decimals} /></span>
			<span className="text-xl ml-1">{unit}</span>
		</span>
	);
}