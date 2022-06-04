import InputDateTime from "./InputDateTime.element";
import InputDateTimeSelector from "./InputDateTimeSelector.element";

export default function InputDateTimeSelectorCombo({ timestamp, setParentTimestamp }) {
	return (
		<div className='flex gap-1 mr-auto'>
			<InputDateTime timestamp={timestamp} setParentTimestamp={setParentTimestamp} />
			<InputDateTimeSelector timestamp={timestamp} setParentTimestamp={setParentTimestamp} />
		</div>
	)
}