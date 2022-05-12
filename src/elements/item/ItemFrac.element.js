export default function ItemFrac(props) {
	return (
		<span className="statItemFrac">
			<span className="statItemOver">{props.over}</span>
			<span className="statItemSign">/</span>
			<span className="statItemUnder">{props.under}</span>
		</span>
	);
}