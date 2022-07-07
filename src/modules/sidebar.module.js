import { ClipboardCheckIcon, DocumentAddIcon, DocumentDownloadIcon, DotsCircleHorizontalIcon, HomeIcon, LogoutIcon, MenuIcon, PlusCircleIcon, UserRemoveIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ExportDataToODS, ImportDataFromODS } from '../helpers/ODS.helper';
import { replaceRecords, logout } from '../redux/data/Data.slice';
import DialogAddEntry from './dialog/DialogAddEntry.module';
import DialogEditEntry from './dialog/DialogEditEntry.module';
import DialogUserDelete from './dialog/DialogUserDelete.module';

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.data.login !== null,
		user: state.data.login,
		data: {
			seasons: state.data.season.seasons,
			categories: state.data.category.categories,
			goals: state.data.goal.goals,
			challenges: state.data.challenge.challenges,
			activities: state.data.activity.activities,
			logs: state.data.log.logs
		},
		bases: {
			seasons: state.data.season.base,
			categories: state.data.category.base,
			goals: state.data.goal.base,
			challenges: state.data.challenge.base,
			activities: state.data.activity.base,
			logs: state.data.log.base
		}
	}
};

const Sidebar = ({ isLoggedIn, user, data, bases }) => {

	const [addDialogOpen, setAddDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState(false);

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

	const logoutUser = (e) => {
		e.preventDefault();
		dispatch(logout());
	}

	const seedDB = async (e) => {
		const body = { user, ...data };
		console.log(body);
		e.preventDefault();
		try {
			const res = await fetch(`/api/seed`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const activities = await res.json();
			console.log('activities', activities);
		} catch (error) {
			// console.log('User not found.');
			console.error(error);
		}
	}

	return (
		<nav className='fixed inset-y-0 -left-0 hover:left-0 flex flex-col gap-1 w-12 p-1 transition-all group'>
			<MenuIcon className='w-8 h-8 m-1 hover:cursor-pointer relative left-0 group-hover:left-0 transition-all'/>
			<div className='p-1 flex flex-col gap-1'>
				<HomeIcon className='w-8 h-8 hover:cursor-pointer'/>
			</div>
			<div className='bg-green-900/25 rounded-lg p-1 flex flex-col gap-1'>
				<ClipboardCheckIcon className='w-8 h-8 hover:cursor-pointer' onClick={seedDB} />
				<PlusCircleIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>setAddDialogOpen(true)}/>
				<DotsCircleHorizontalIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>setEditDialogOpen(true)}/>
			</div>
			<div className='bg-red-900/25 rounded-lg p-1 flex flex-col gap-1'>
				{ isLoggedIn && <LogoutIcon className='w-8 h-8 hover:cursor-pointer' onClick={logoutUser}/> }
				{ isLoggedIn && <UserRemoveIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>setUserDeleteDialogOpen(true)}/> }
				<DocumentAddIcon className='w-8 h-8' onDrop={onDrop} onDragOver={onDragOver}/>
				<DocumentDownloadIcon className='w-8 h-8 hover:cursor-pointer' onClick={()=>ExportDataToODS(data)}/>
			</div>
			<DialogAddEntry isOpen={addDialogOpen} setIsOpen={setAddDialogOpen} />
			<DialogEditEntry isOpen={editDialogOpen} setIsOpen={setEditDialogOpen} />
			<DialogUserDelete isOpen={userDeleteDialogOpen} setIsOpen={setUserDeleteDialogOpen} />
		</nav>
	)
}

export default connect(mapStateToProps)(Sidebar);