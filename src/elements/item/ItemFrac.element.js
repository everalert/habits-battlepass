export default function ItemFrac(props) {
	return (
		<span className="text-xl">
			<span className="text-2xl">{props.over}</span>
			<span>/</span>
			<span>{props.under}</span>
		</span>
	);
}