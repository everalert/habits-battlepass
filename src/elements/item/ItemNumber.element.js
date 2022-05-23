// TODO: accept props for decimal places

import { FormatNumber } from "../../helpers/Math.helper";

export default function ItemNumber({num}) {
	return (
		<>{typeof num === 'number' ? FormatNumber(num) : num}</>
	)
}