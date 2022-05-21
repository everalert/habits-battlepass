import { DocumentAddIcon, DocumentDownloadIcon, HomeIcon, MenuIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { ExportDataToODS } from '../helpers/ODS.helper';

const mapStateToProps = (state) => {
	return {
		data: {
			seasons: state.season.seasons,
			categories: state.category.categories,
			goals: state.goal.goals,
			challenges: state.challenge.challenges,
			activities: state.activity.activities,
			logs: state.log.logs
		}
	}
};

const Sidebar = ({data}) => {
	return (
		<nav className='fixed inset-y-0 -left-12 hover:left-0 w-12 p-1 transition-all group'>
			<MenuIcon className='w-8 h-8 m-1 hover:cursor-pointer relative left-12 group-hover:left-0 transition-all'/>
			<div className='p-1 flex flex-col gap-1'>
				<HomeIcon className='w-8 h-8 hover:cursor-pointer'/>
			</div>
			<div className='bg-red-900/25 rounded-lg p-1 flex flex-col gap-1'>
				<DocumentAddIcon className='w-8 h-8 hover:cursor-pointer'/>
				<DocumentDownloadIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>ExportDataToODS(data)}/>
			</div>
		</nav>
	)
}

export default connect(mapStateToProps)(Sidebar);