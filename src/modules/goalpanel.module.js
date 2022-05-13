import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'
import TaskCollection from './task/TaskCollection.module'

export default function GoalPanel() {
	 return (
		<div>
			<div className='text-center mb-8'>
				<h1 className="text-xl font-bold uppercase">
					<span>10,000</span>
					<span className='text-lg ml-0.5'>語</span>
					<span className='text-base mx-1'>to</span>
					<span>15,000</span>
					<span className='text-lg ml-0.5'>語</span>
				</h1>
				<h2 className='text-sm -my-1.5 uppercase'>Japanese</h2>
			</div>
			<div className='flex gap-4 justify-center'>
				<div className='relative'>
					<svg xmlns="http://www.w3.org/2000/svg" class="absolute h-32 w-32 left-0 top-0" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 0 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
					<div className="w-32 h-32">
						<RadialBar size={128} value={15000} max={25000} thickness={8} corner={1} delay={500} />
					</div>
				</div>
				<div className='outline outline-1 outline-gray-800 rounded-lg'><LineChart/></div>
			</div>
			<div className="grid grid-cols-2 gap-y-4 px-4 py-8">
				<StatPar abs={500} rel={500} unit='XP' />
				<StatPar abs={500} rel={500} unit='語' />
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label='DAILY' />
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label='WEEK 7' />
			</div>
			<div className="flex flex-col gap-6">
				<TaskCollection label='DAILY' />
				<TaskCollection label='WEEKLY' />
			</div>
		</div>
	)
}