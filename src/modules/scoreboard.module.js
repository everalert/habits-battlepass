import GoalPanel from './GoalPanel.module'
import SeasonPanel from './SeasonPanel.module'

export default function Scoreboard() {
	 return (
		<main className='flex flex-col lg:flex-row justify-center mx-auto'>
			<SeasonPanel/>
			{/* <div className="grid grid-cols-4 gap-8 px-8 grow"> */}
			<div className="flex flex-wrap justify-center gap-8 px-8">
				<GoalPanel goal={0} />
				<GoalPanel goal={1} />
				<GoalPanel goal={2} />
				<GoalPanel goal={3} />
			</div>
		</main>
	)
}