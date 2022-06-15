export default function InputEnableButton({ enableFunc }) {
	
	return (
		<input type='button' value='ENABLE' onClick={enableFunc} className="h-7 w-20 text-center font-bold uppercase bg-sky-700 hover:bg-sky-600 active:bg-sky-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}