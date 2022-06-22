import { connect } from 'react-redux'
import { GetCurrentUnixTimestamp } from '../helpers/Math.helper'
import SeasonIcon from './season/SeasonIcon.module'
import SeasonProgressBarLevel from './season/SeasonProgressBarLevel.module'
import SeasonProgressBarTotal from './season/SeasonProgressBarTotal.module'


const mapStateToProps = (state, ownProps) => {
	return {
		season: state.data.season.seasons[state.data.season.active],
		...ownProps
	}
}


function SeasonPanel({ season }) {
	const timeNow = GetCurrentUnixTimestamp()
	const timeEnd = season.start+season.length
	const timeRemain = timeEnd-timeNow
	return (
		<div className="lg:w-96 my-12 text-center mx-auto">
			<div className="relative w-72 h-72 mx-auto mb-6">
				<SeasonProgressBarTotal seasonId={season.id} />
				<SeasonIcon/>
				<SeasonProgressBarLevel seasonId={season.id} />
				<div className="w-72 h-48 absolute top-20 left-0 text-9xl text-center text-black font-bold font-mono">{season.currentLevel}</div>
			</div>
			<h1 className='text-3xl font-bold tracking-widest uppercase'>{season.title}</h1>
			<h2 className='text-2xl tracking-tighter -mt-2 uppercase'>{Math.floor(timeRemain/86400)} days remain</h2>
		</div>
	)
}

export default connect(mapStateToProps)(SeasonPanel);