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
					<svg xmlns="http://www.w3.org/2000/svg" class="absolute h-28 w-28 left-2 top-2" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
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