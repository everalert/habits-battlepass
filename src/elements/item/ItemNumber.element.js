// TODO: accept props for decimal places

export default function ItemNumber({num}) {
	return (
		<>{typeof num === 'number' ? num.toLocaleString(undefined) : num}</>
	)
}