import { FormatActivityValue } from "../../redux/helpers/Activity.helpers"
import ItemNumber from "../item/ItemNumber.element"

export default function GoalPanelHeader({goal, lagActivity}) {
	const lagStart = FormatActivityValue(lagActivity, goal.goalLagStartValue)
	const lagEnd = FormatActivityValue(lagActivity, goal.goalLagEndValue)
	return (
		<div className='text-center mb-8'>
			<h1 className="text-xl font-bold uppercase">
				<span><ItemNumber num={lagStart.value} /></span>
				<span className='text-lg ml-0.5'>{lagStart.unit}</span>
				<span className='text-base mx-1'>to</span>
				<span><ItemNumber num={lagEnd.value} /></span>
				<span className='text-lg ml-0.5'>{lagEnd.unit}</span>
			</h1>
			<h2 className='text-sm -my-1.5 uppercase'>{lagActivity.label}</h2>
		</div>
	)
}