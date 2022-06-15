import Sidebar from '../src/modules/Sidebar.module'
import Scoreboard from '../src/modules/Scoreboard.module'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
	return {
		seasonId: state.data.season.seasons[state.data.season.active].id
	}
}


function Home({ seasonId }) {

	return (
		<div>
			<Scoreboard seasonId={seasonId} />
			<Sidebar/>
		</div>
	)

}

export default connect(mapStateToProps)(Home);