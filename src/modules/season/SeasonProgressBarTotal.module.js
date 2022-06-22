import { connect } from "react-redux";
import RadialBar from "../../elements/RadialBar.element";


const mapStateToProps = (state, ownProps) => {
	const season = state.data.season.seasons.find(s => s.id === ownProps.seasonId)
	return {
		currentXP: season.currentXP,
		maxXP: season.levelXP*season.levelMax,
		...ownProps
	}
}


function SeasonProgressBarTotal({ currentXP, maxXP }) {
	return (
		<div className="iconProgressBar">
			<RadialBar
				value={currentXP}
				max={maxXP}
				thickness={0.25}
				corner={2}
				label='XP'
			/>
		</div>
	)
}

export default connect(mapStateToProps)(SeasonProgressBarTotal)