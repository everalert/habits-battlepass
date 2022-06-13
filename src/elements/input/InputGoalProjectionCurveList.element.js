import { useEffect, useState } from "react";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
	return {
		projectionCurveList: state.data.goal.opts.projectionCurve,
		...ownProps
	}
}


function InputGoalProjectionCurveList({ curve, setParentCurve, projectionCurveList }) {

	const [curveIdx, setCurveIdx] = useState(projectionCurveList.findIndex((p)=>p===curve));
	const incCurveIdx = () => setCurveIdx((curveIdx+1)%projectionCurveList.length);

	useEffect(()=>{
		setParentCurve(projectionCurveList[curveIdx]);
	}, [curveIdx])

	return (
		<input type='button' value={projectionCurveList[curveIdx]} onClick={incCurveIdx} className="h-7 w-24 text-center font-bold uppercase bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}

export default connect(mapStateToProps)(InputGoalProjectionCurveList);