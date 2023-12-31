import { useEffect, useState } from "react";
import { GetCurrentUnixTimestamp } from '../../helpers/Math.helper';


export default function InputDateTimeSelector({ timestamp, setParentTimestamp }) {

	const dateopts = ['now','-1d','-2d','-7d','-14d','other']
	const dateoptToTimestamp = (opt) => {
		switch (opt) {
			case 'now': return GetCurrentUnixTimestamp();
			case '-1d': return GetCurrentUnixTimestamp()-86400;
			case '-2d': return GetCurrentUnixTimestamp()-172800;
			case '-7d': return GetCurrentUnixTimestamp()-604800;
			case '-14d': return GetCurrentUnixTimestamp()-1209600;
			case 'other':
			default: return timestamp;
		}
	}
	const [datefill, setDatefill] = useState(0);
	const incDatefill = () => setDatefill((datefill+1)%dateopts.length);

	useEffect(() => {
		setParentTimestamp(dateoptToTimestamp(dateopts[datefill]))
	}, [datefill]);

	return (
		<input type='button' value={dateopts[datefill]} onClick={incDatefill} className="h-7 w-20 text-center font-bold uppercase bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}