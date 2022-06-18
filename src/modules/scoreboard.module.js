import { connect } from 'react-redux'
import GoalPanel from './GoalPanel.module'
import SeasonPanel from './SeasonPanel.module'


const mapStateToProps = (state, ownProps) => {
	return {
		renderTick: state.meta.renderTick,
		goals: state.data.goal.goals.filter(g => g.seasonId === ownProps.seasonId),
		...ownProps
	}
}


function Scoreboard({ goals }) {

	return (
		<main className='flex flex-col lg:flex-row justify-center mx-auto'>
			<SeasonPanel/>
			<div className="flex flex-wrap justify-center gap-8 px-8">
				{ goals.map(g => <GoalPanel key={g.id} goal={g} />) }
			</div>
		</main>
	)

}

export default connect(mapStateToProps)(Scoreboard);