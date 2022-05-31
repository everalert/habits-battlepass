import { useEffect, useState } from "react";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
	return {
		typeList: state.activity.opts.type,
		...ownProps
	}
}


function InputActivityTypeSelector({ type, setParentType, typeList }) {

	const [typeIdx, setTypeIdx] = useState(typeList.findIndex((p)=>p===type));
	const incTypeIdx = () => setTypeIdx((typeIdx+1)%typeList.length);

	useEffect(()=>{
		setParentType(typeList[typeIdx]);
	}, [typeIdx])

	return (
		<input type='button' value={typeList[typeIdx]} onClick={incTypeIdx} className="h-7 w-24 text-center font-bold uppercase bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}

export default connect(mapStateToProps)(InputActivityTypeSelector);