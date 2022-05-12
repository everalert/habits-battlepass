import Sidebar from '../src/modules/Sidebar.module'
import Scoreboard from '../src/modules/Scoreboard.module'

export default function Home() {
	return (
		<div>
			<Scoreboard/>
			<Sidebar/>
		</div>
	)
}
