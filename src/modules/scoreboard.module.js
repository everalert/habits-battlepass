import GoalPanel from './goalpanel.module'
import SeasonPanel from './seasonpanel.module'

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