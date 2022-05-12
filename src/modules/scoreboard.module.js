import GoalPanel from './GoalPanel.module'
import SeasonPanel from './SeasonPanel.module'

export default function Scoreboard() {
	 return (
		<main>
			<SeasonPanel/>
			<div className="goalContainer">
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
				<GoalPanel/>
			</div>
		</main>
	)
}