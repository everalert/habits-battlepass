export default function InputCopyButton({ copyFunc }) {
	
	return (
		<input type='button' value='COPY' onClick={copyFunc} className="h-7 w-16 text-center font-bold uppercase bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}