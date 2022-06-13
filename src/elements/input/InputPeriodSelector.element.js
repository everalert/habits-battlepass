import { useEffect, useState } from "react";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
	return {
		periodList: state.data.challenge.opts.period,
		...ownProps
	}
}


function InputPeriodSelector({ period, setParentPeriod, periodList }) {

	const [periodIdx, setPeriodIdx] = useState(periodList.findIndex((p)=>p===period));
	const incPeriodIdx = () => setPeriodIdx((periodIdx+1)%periodList.length);

	useEffect(()=>{
		setParentPeriod(periodList[periodIdx]);
	}, [periodIdx])

	return (
		<input type='button' value={periodList[periodIdx]} onClick={incPeriodIdx} className="h-7 w-20 text-center font-bold uppercase bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 hover:cursor-pointer rounded aspect-square select-none" />
	)

}

export default connect(mapStateToProps)(InputPeriodSelector);