import Sidebar from '../src/modules/Sidebar.module'
import Scoreboard from '../src/modules/Scoreboard.module'
import { connect, useDispatch } from 'react-redux'
import { ImportDataFromODS, SourceToODS } from '../src/helpers/ODS.helper'
import { replaceRecords } from '../src/redux/data/Data.slice'
import { incRenderTick } from '../src/redux/meta/Meta.slice'
import { useEffect } from 'react'


const mapStateToProps = (state) => {
	const season = state.data.season.seasons[state.data.season.active];
	return {
		seasonId: season ? season.id : -1,
		bases: {
			seasons: state.data.season.base,
			categories: state.data.category.base,
			goals: state.data.goal.base,
			challenges: state.data.challenge.base,
			activities: state.data.activity.base,
			logs: state.data.log.base
		}
	}
}


function Home({ seasonId, bases }) {

	const dispatch = useDispatch();

	useEffect(()=>{
		const tick = setInterval(()=>dispatch(incRenderTick()), 1000);
	}, [])

	if (seasonId === -1)
		SourceToODS('/data/default.ods').then(file => {
			ImportDataFromODS(file, bases).then(response => {
				if (response !== false)
					dispatch(replaceRecords(response));
			});
		});

	return (
		<div>
			{ seasonId >= 0 && <Scoreboard seasonId={seasonId} />}
			<Sidebar/>
		</div>
	)

}

export default connect(mapStateToProps)(Home);