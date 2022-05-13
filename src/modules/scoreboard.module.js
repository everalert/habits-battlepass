import GoalPanel from './GoalPanel.module'
import SeasonPanel from './SeasonPanel.module'

export default function Scoreboard() {
	 return (
		<main className='flex w-screen'>
			<SeasonPanel/>
			<div className="grid grid-cols-4 gap-8 px-8 grow">
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
			</div>
		</main>
	)
}