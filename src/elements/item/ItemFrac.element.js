import ItemNumber from "./ItemNumber.element";

export default function ItemFrac(props) {
	return (
		<span className="text-xl">
			<span className="text-2xl"><ItemNumber num={props.over} /></span>
			<span>/</span>
			<span><ItemNumber num={props.under} /></span>
		</span>
	);
}