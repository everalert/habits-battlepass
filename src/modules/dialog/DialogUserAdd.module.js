import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import InputResetSubmitCombo from '../../elements/input/InputResetSubmitCombo.element';
import InputText from '../../elements/input/InputText.element';


export default function DialogUserAdd({ isOpen, setIsOpen }) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [id, setId] = useState('');

	const resetForm = () => {
		setUsername('');
		setPassword('');
		setEmail('');
	}

	const submitForm = async (e) => {
		e.preventDefault()
		try {
			const body = { username, password, email }
			const res = await fetch(`/api/user`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const user = await res.json();
			setId(user.id);
		} catch (error) {
			console.error(error)
		}
		resetForm();
		// setParentOpen(false);
	}

	return (
		<Dialog open={isOpen} onClose={setIsOpen}>
			<Dialog.Overlay className="fixed inset-0 backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 bg-zinc-700/50"/>
			<div className="fixed inset-y-0 left-1/2 flex flex-col gap-4 -ml-48 my-8 w-96 bg-zinc-900 rounded-xl ring-2 ring-black/10 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-zinc-800">
				<form onSubmit={submitForm} className='m-4 text-sm flex flex-col justify-center gap-2'>
					<h1 className="text-xl text-center uppercase font-bold">Add User</h1>
					<h2 className='-mb-1.5'>username</h2>
					<InputText text={username} setParentText={setUsername} />
					<h2 className='-mb-1.5'>password</h2>
					<InputText text={password} setParentText={setPassword} />
					<h2 className='-mb-1.5'>email</h2>
					<InputText text={email} setParentText={setEmail} />
					<InputResetSubmitCombo resetFunc={resetForm} submitFunc={submitForm} />
				</form>
				<div className='m-4'>ID: {id}</div>
			</div>
		</Dialog>
	)

}