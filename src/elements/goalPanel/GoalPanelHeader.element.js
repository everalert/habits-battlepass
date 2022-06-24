import { FormatActivityValue } from "../../redux/helpers/Activity.helpers"
import ItemNumber from "../item/ItemNumber.element"
import { useSpring, animated } from '@react-spring/web'


const AnimatedItemNumber = animated(ItemNumber);


export default function GoalPanelHeader({goal, lagActivity}) {

	const lagUnit = FormatActivityValue(lagActivity, goal.goalLagStartValue).unit
	const formatFunc = (value) => FormatActivityValue(lagActivity, value, undefined, undefined, 1).value

	const { aLagStart, aLagEnd } = useSpring({
		aLagStart: goal.goalLagStartValue,
		aLagEnd: goal.goalLagEndValue
	})

	return (
		<div className='text-center mb-8'>
			<h1 className="text-xl font-bold uppercase">
				<span><AnimatedItemNumber num={aLagStart.to(x => formatFunc(x))} /></span>
				<span className='text-lg ml-0.5'>{lagUnit}</span>
				<span className='text-base mx-1'>to</span>
				<span><AnimatedItemNumber num={aLagEnd.to(x => formatFunc(x))} /></span>
				<span className='text-lg ml-0.5'>{lagUnit}</span>
			</h1>
			<h2 className='text-sm -my-1.5 uppercase'>{lagActivity.label}</h2>
		</div>
	)

}