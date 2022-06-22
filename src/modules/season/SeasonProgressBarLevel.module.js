import { connect } from "react-redux";
import RadialBar from "../../elements/RadialBar.element";


const mapStateToProps = (state, ownProps) => {
	const season = state.data.season.seasons.find(s => s.id === ownProps.seasonId)
	return {
		currentXP: season.currentXP%season.levelXP,
		maxXP: season.levelXP,
		...ownProps
	}
}


function SeasonProgressBarLevel({ currentXP, maxXP }) {
	return (
		<div className="w-52 h-52 absolute top-10 left-10">
			<RadialBar
				value={currentXP}
				max={maxXP}
				thickness={0.04}
				corner={1}
				label='XP'
			/>
		</div>
	)
}

export default connect(mapStateToProps)(SeasonProgressBarLevel)