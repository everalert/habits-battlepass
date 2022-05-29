import Sidebar from '../src/modules/Sidebar.module'
import Scoreboard from '../src/modules/Scoreboard.module'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
	return {
		seasonId: state.season.active
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