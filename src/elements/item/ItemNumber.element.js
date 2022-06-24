import { FormatNumber } from "../../helpers/Math.helper";


export default function ItemNumber({ num, decimals = 0 }) {
	return (
		<>{ typeof num === 'number' ? FormatNumber(num, decimals) : num }</>
	)
}