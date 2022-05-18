import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'
import TaskCollection from './task/TaskCollection.module'
import ItemNumber from '../elements/item/ItemNumber.element'
import { useSelector } from 'react-redux'
import { GetActivityUnit } from '../redux/helpers/Activity.helpers'
import { GetDayOfSeason, GetWeekOfSeason } from '../redux/helpers/Season.helper'
import { GetGoalProjectedXpAtTime, GetGoalSuccessXp } from '../redux/helpers/Goal.helper'
import { GetCurrentUnixTimestamp } from '../helpers/Math.helper'

export default function GoalPanel(props) {
	const season = useSelector((state) => state.season.seasons.find(s => s.id === state.season.active));
	const timestamp = GetCurrentUnixTimestamp()
	
	const goalId = props.goal && props.goal >= 0 ? props.goal : 0;
	const goal = useSelector((state) => state.goal.goals.find(g => g.id === goalId))
	const goalLagActivity = useSelector((state) => state.activity.activities.find(a => a.id === goal.goalLagActivityId))
	const goalLagUnit = GetActivityUnit(goalLagActivity)
	const goalLeadActivity = useSelector((state) => state.activity.activities.find(a => a.id === goal.goalLeadActivityId))

	const goalSuccessXp = GetGoalSuccessXp(goal)
	const goalProjectedXp = Math.round(GetGoalProjectedXpAtTime(goal, timestamp))
	const goalProjectedXpDelta = goal.currentXP-goalProjectedXp
	return (
		<div>
			<div className='text-center mb-8'>
				<h1 className="text-xl font-bold uppercase">
					<span><ItemNumber num={goal.goalLagStartValue} /></span>
					<span className='text-lg ml-0.5'>{goalLagUnit}</span>
					<span className='text-base mx-1'>to</span>
					<span><ItemNumber num={goal.goalLagEndValue} /></span>
					<span className='text-lg ml-0.5'>{goalLagUnit}</span>
				</h1>
				<h2 className='text-sm -my-1.5 uppercase'>{goalLagActivity.label}</h2>
			</div>
			<div className='flex gap-4 justify-center'>
				<div className='relative'>
					<svg xmlns="http://www.w3.org/2000/svg" class="absolute h-32 w-32 left-0 top-0" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 0 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" class="absolute h-20 w-20 left-6 top-6 fill-black" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />
					</svg>
					<div className="w-32 h-32">
						<RadialBar size={128} value={goal.currentXP} max={goalSuccessXp} thickness={8} corner={1} delay={500} />
					</div>
				</div>
				<div className='outline outline-1 outline-gray-800 rounded-lg'><LineChart/></div>
			</div>
			<div className="grid grid-cols-2 gap-y-4 px-4 py-8">
				<StatPar abs={goal.currentXP} rel={goalProjectedXpDelta} unit='XP' />
				<StatPar abs={500} rel={500} unit={goalLagUnit} />
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label={`DAY ${GetDayOfSeason(season).no}`} />
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label={`WEEK ${GetWeekOfSeason(season).no}`} />
			</div>
			<div className="flex flex-col gap-6">
				<TaskCollection label='DAILY' />
				<TaskCollection label='WEEKLY' />
			</div>
		</div>
	)
}