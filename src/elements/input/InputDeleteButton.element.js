export default function InputDeleteButton({ deleteFunc }) {
	
	return (
		<input type='button' value='DELETE' onClick={deleteFunc} className="h-7 w-20 text-center font-bold uppercase bg-red-700 hover:bg-red-600 active:bg-red-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}