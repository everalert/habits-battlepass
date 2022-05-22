import { DocumentAddIcon, DocumentDownloadIcon, HomeIcon, MenuIcon } from '@heroicons/react/solid';
import { connect, useDispatch } from 'react-redux';
import { ExportDataToODS, ImportDataFromODS } from '../helpers/ODS.helper';
import { replaceRecords } from '../redux/slices/Manager.slice';

const mapStateToProps = (state) => {
	return {
		data: {
			seasons: state.season.seasons,
			categories: state.category.categories,
			goals: state.goal.goals,
			challenges: state.challenge.challenges,
			activities: state.activity.activities,
			logs: state.log.logs
		},
		bases: {
			seasons: state.season.base,
			categories: state.category.base,
			goals: state.goal.base,
			challenges: state.challenge.base,
			activities: state.activity.base,
			logs: state.log.base
		}
	}
};

const Sidebar = ({data, bases}) => {
	const dispatch = useDispatch();
	const onDragOver = (e) => {
		e.preventDefault();
	}
	const onDrop = (e) => {
		e.preventDefault();
		ImportDataFromODS(e.dataTransfer.files[0], bases).then(response => {
			if (response !== false)
				dispatch(replaceRecords(response));
		});
	}

	return (
		<nav className='fixed inset-y-0 -left-0 hover:left-0 w-12 p-1 transition-all group'>
			<MenuIcon className='w-8 h-8 m-1 hover:cursor-pointer relative left-0 group-hover:left-0 transition-all'/>
			<div className='p-1 flex flex-col gap-1'>
				<HomeIcon className='w-8 h-8 hover:cursor-pointer'/>
			</div>
			<div className='bg-red-900/25 rounded-lg p-1 flex flex-col gap-1'>
				<DocumentAddIcon className='w-8 h-8' onDrop={onDrop} onDragOver={onDragOver}/>
				<DocumentDownloadIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>ExportDataToODS(data)}/>
			</div>
		</nav>
	)
}

export default connect(mapStateToProps)(Sidebar);