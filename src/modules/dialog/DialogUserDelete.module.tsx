import { Dialog, Tab } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { connect } from 'react-redux'
import InputPassword from '../../elements/input/InputPassword.element'
import InputResetSubmitCombo from '../../elements/input/InputResetSubmitCombo.element'
import { logout } from '../../redux/data/Data.slice'
import { useAppDispatch } from '../../redux/ReduxStore'


const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.data.login !== null,
		user: state.data.login,
		...ownProps
	}
}


function DialogUserDelete({ isLoggedIn, user, isOpen, setIsOpen }) {

	const dispatch = useAppDispatch();

	const id = isLoggedIn ? user.id : '';
	const [password, setPassword] = useState('');

	const resetForm = () => setPassword('')
	
	const submitUserWipe = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const body = { id, password }
			const res = await fetch(`/api/user/wipe`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const wipe = await res.json();
			setIsOpen(false);
			dispatch(logout());
			resetForm();
		} catch (error) {
			console.log('Wiping user data failed.')
			console.error(error)
		}
	}
	
	const submitUserDelete = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const body = { id, password }
			const res = await fetch(`/api/user/delete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const del = await res.json();
			setIsOpen(false);
			dispatch(logout());
			resetForm();
		} catch (error) {
			console.log('User deletion failed.')
			console.error(error)
		}
	}
	
	const baseBtnStyle = 'mb-px mx-px px-3 py-1 rounded text-center font-medium uppercase cursor-pointer'
	const sideBtnStyle = 'fill-zinc-500 hover:fill-zinc-400 active:fill-zinc-600 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800'
	const mainBtnStyle = 'bg-slate-600 hover:bg-slate-500 active:bg-slate-700'

	if (!isLoggedIn) return <div/>
	return (<Dialog open={isOpen} onClose={setIsOpen}>
		<Dialog.Overlay className="fixed inset-0 backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 bg-zinc-700/50"/>
			<Tab.Group as='div' defaultIndex={0} className="fixed inset-y-0 left-1/2 flex flex-col gap-4 -ml-48 my-8 w-96 bg-zinc-900 rounded-xl ring-2 ring-black/10 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-zinc-800">
				<Tab.List className="mt-4 flex flex-wrap justify-center gap-0.5 select-none">
					<Tab>{({ selected }) => <div className={`w-36 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>Wipe Data</div>}</Tab>
					<Tab>{({ selected }) => <div className={`w-36 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>Delete User</div>}</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						<form onSubmit={submitUserWipe} className='mx-4 text-sm flex flex-col justify-center gap-2'>
							<h2 className='-mb-1.5 font-bold'>wipe {user.username}'s data</h2>
							<p className='text-red-500'>All data connected to {user.username} will be permanently deleted, and reset to a clean slate.</p>
							<p className='text-red-500'>This is not reversible. Proceed at your own risk.</p>
							<h2 className='-mb-1.5'>password</h2>
							<InputPassword password={password} setParentPassword={setPassword} />
							<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitUserWipe} />
						</form>
					</Tab.Panel>
					<Tab.Panel>
						<form onSubmit={submitUserDelete} className='mx-4 text-sm flex flex-col justify-center gap-2'>
							<h2 className='-mb-1.5 font-bold'>delete {user.username}</h2>
							<p className='text-red-500'>{user.username} will be permanently deleted, and all associated data will also be removed.</p>
							<p className='text-red-500'>This is not reversible. Proceed at your own risk.</p>
							<h2 className='-mb-1.5'>password</h2>
							<InputPassword password={password} setParentPassword={setPassword} />
							<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitUserDelete} />
						</form>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</Dialog>)

}

export default connect(mapStateToProps)(DialogUserDelete);