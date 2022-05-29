export default function InputBool({ bool, setParentBool }) {

	const label = bool ? 'YES' : 'NO';
	const coloring = bool ? 'bg-blue-700 hover:bg-blue-600 active:bg-blue-800' : 'bg-red-700 hover:bg-red-600 active:bg-red-800';
	
	return (
		<input type='button' value={label} onClick={()=>setParentBool(!bool)} className={`h-7 w-12 text-center font-bold uppercase ${coloring} hover:cursor-pointer rounded aspect-square select-none`} />
	)

}