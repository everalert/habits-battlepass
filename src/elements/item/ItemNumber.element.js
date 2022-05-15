// TODO: accept props for decimal places

export default function ItemNumber(props) {
	return (
		<>{props.num.toLocaleString(undefined)}</>
	)
}