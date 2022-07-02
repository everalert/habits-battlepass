export default function InputPassword({ password, setParentPassword, short = false, onFocus = undefined, onBlur = undefined }) {

	return (
		<label className={`${short && 'w-20'} h-7 flex items-center px-2 rounded text-zinc-600 caret-zinc-500 bg-zinc-300`}>
			<input type="password" placeholder="password" value={password ?? ''} onChange={(e)=>setParentPassword(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-full bg-transparent focus:outline-none focus:text-zinc-900 placeholder:text-zinc-400 text-left" />
		</label>
	)

}