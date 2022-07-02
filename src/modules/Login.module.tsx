import { Tab } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { connect } from 'react-redux'
import InputPassword from '../elements/input/InputPassword.element'
import InputResetSubmitCombo from '../elements/input/InputResetSubmitCombo.element'
import InputText from '../elements/input/InputText.element'
import { login } from '../redux/data/Data.slice'
import { useAppDispatch } from '../redux/ReduxStore'


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.data.login !== null,
		user: state.data.login
	}
}


function Login({ isLoggedIn, user }) {

	const dispatch = useAppDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const resetForm = () => {
		setUsername('');
		setPassword('');
		setEmail('');
	}
	
	const submitLogin = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const body = { username, password }
			const res = await fetch(`/api/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const user = await res.json();
			if (user.id !== null) {
				dispatch(login({ user }));
				resetForm();
			}
		} catch (error) {
			console.log('User not found.')
			console.error(error)
		}
	}
	
	const submitSignup = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const body = { username, password, email }
			const res = await fetch(`/api/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const user = await res.json();
			if (user.id !== null) {
				dispatch(login({ user }));
				resetForm();
			}
		} catch (error) {
			console.log('User creation failed.')
			console.error(error)
		}
	}
	
	const baseBtnStyle = 'mb-px mx-px px-3 py-1 rounded text-center font-medium uppercase cursor-pointer'
	const sideBtnStyle = 'fill-zinc-500 hover:fill-zinc-400 active:fill-zinc-600 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800'
	const mainBtnStyle = 'bg-slate-600 hover:bg-slate-500 active:bg-slate-700'

	if (isLoggedIn)
		return <div>Already logged in. ({user.username})</div>
	else
		return <Tab.Group as='div' defaultIndex={0} className="w-72 m-auto flex flex-col gap-4">
			<Tab.List className="flex flex-wrap justify-center gap-0.5 select-none">
				<Tab>{({ selected }) => <div className={`w-28 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>Login</div>}</Tab>
				<Tab>{({ selected }) => <div className={`w-28 ${baseBtnStyle} ${ selected ? mainBtnStyle : sideBtnStyle}`}>Signup</div>}</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>
					<form onSubmit={submitLogin} className='m-4 text-sm flex flex-col justify-center gap-2'>
						<h2 className='-mb-1.5'>username</h2>
						<InputText text={username} setParentText={setUsername} />
						<h2 className='-mb-1.5'>password</h2>
						<InputPassword password={password} setParentPassword={setPassword} />
						<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitLogin} />
					</form>
				</Tab.Panel>
				<Tab.Panel>
					<form onSubmit={submitSignup} className='m-4 text-sm flex flex-col justify-center gap-2'>
						<h2 className='-mb-1.5'>username</h2>
						<InputText text={username} setParentText={setUsername} />
						<h2 className='-mb-1.5'>password</h2>
						<InputPassword password={password} setParentPassword={setPassword} />
						<h2 className='-mb-1.5'>email</h2>
						<InputText text={email} setParentText={setEmail} />
						<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitSignup} />
					</form>
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>

}

		

export default connect(mapStateToProps)(Login);