import GoalPanel from './GoalPanel.module'
import SeasonPanel from './SeasonPanel.module'

export default function Scoreboard() {
	 return (
		<main>
			<SeasonPanel/>
			<div className="grid grid-cols-2 gap-8 px-8">
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
			</div>
		</main>
	)
}