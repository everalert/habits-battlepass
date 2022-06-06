import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputCategoryList from "../../elements/input/InputCategoryList.element";
import InputDuration from '../../elements/input/InputDuration.element';
import InputGoalProjectionCurveList from "../../elements/input/InputGoalProjectionCurveList.element";
import InputSeasonList from "../../elements/input/InputSeasonList.element";
import InputText from "../../elements/input/InputText.element";


const mapStateToProps = (state, ownProps) => {
	return {
		season: state.season.seasons.find(s => s.id === ownProps.goalObj.seasonId),
		seasons: state.season.seasons,
		category: state.category.categories.find(c => c.id === ownProps.goalObj.categoryId),
		categories: state.category.categories,
		activityLG: state.activity.activities.find(l => l.id === ownProps.goalObj.goalLagActivityId),
		activityLE: state.activity.activities.find(l => l.id === ownProps.goalObj.goalLeadActivityId),
		activities: state.activity.activities,
		...state.goal.opts,
		...ownProps
	}
}


function InputGoal({ season, seasons, category, categories, activityLG, activityLE, activities, goalObj, setGoalObj }) {

	const [selectedSeason, setSelectedSeason] = useState(season);
	const [selectedCategory, setSelectedCategory] = useState(category);
	const [selectedActivityLG, setSelectedActivityLG] = useState(activityLG);
	const [selectedActivityLE, setSelectedActivityLE] = useState(activityLE);

	const [selectedVariationLG, setSelectedVariationLG] = useState(goalObj.goalLagActivityVariation);
	const [selectedVariationLE, setSelectedVariationLE] = useState(goalObj.goalLeadActivityVariation);
	const [isTimeTaskLG, setIsTimeTaskLG] = useState(selectedActivityLG.type === 'time');
	const [isTimeTaskLE, setIsTimeTaskLE] = useState(selectedActivityLE.type === 'time');

	const [noteInput, setNoteInput] = useState(goalObj.goalNote);
	
	const [durationInputLGS, setDurationInputLGS] = useState(goalObj.goalLagStartValue); 
	const [durationInputLGE, setDurationInputLGE] = useState(goalObj.goalLagEndValue);
	const [durationInputLE, setDurationInputLE] = useState(goalObj.goalLeadActivityTarget);

	const [amountInputLGS, setAmountInputLGS] = useState(goalObj.goalLagStartValue); 
	const [amountInputLGE, setAmountInputLGE] = useState(goalObj.goalLagEndValue);
	const [amountInputLE, setAmountInputLE] = useState(goalObj.goalLeadActivityTarget);
	
	const [xpCurrentInput, setXpCurrentInput] = useState(goalObj.xpCurrentInput);
	const [xpRatioInput, setXpRatioInput] = useState(goalObj.seasonXpRatio);
	const [curveInput, setCurveInput] = useState(goalObj.goalLagProjectionCurve);

	useEffect(()=>{
		setSelectedSeason(seasons.find(s => s.id === goalObj.seasonId));
		setSelectedCategory(categories.find(c => c.id === goalObj.categoryId));
		setSelectedActivityLG(activities.find(a => a.id === goalObj.goalLagActivityId));
		setSelectedActivityLE(activities.find(a => a.id === goalObj.goalLeadActivityId));
		setSelectedVariationLG(goalObj.goalLagActivityVariation);
		setSelectedVariationLE(goalObj.goalLeadActivityVariation);
		setDurationInputLGS(goalObj.goalLagStartValue);
		setDurationInputLGE(goalObj.goalLagEndValue);
		setDurationInputLE(goalObj.goalLeadActivityTarget);
		setAmountInputLGS(goalObj.goalLagStartValue);
		setAmountInputLGE(goalObj.goalLagEndValue);
		setAmountInputLE(goalObj.goalLeadActivityTarget);
		setXpCurrentInput(goalObj.currentXP);
		setXpRatioInput(goalObj.seasonXpRatio);
		setCurveInput(goalObj.goalLagProjectionCurve);
		setNoteInput(goalObj.goalNote);
	}, [goalObj])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {seasonId: selectedSeason.id}))
	}, [selectedSeason])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {categoryId: selectedCategory.id}))
	}, [selectedCategory])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLagActivityId: selectedActivityLG.id}))
		setIsTimeTaskLG(selectedActivityLG.type === 'time');
	}, [selectedActivityLG])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLeadActivityId: selectedActivityLE.id}))
		setIsTimeTaskLE(selectedActivityLE.type === 'time');
	}, [selectedActivityLE])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLagEndValue: isTimeTaskLG ? durationInputLGE : amountInputLGE}))
	}, [isTimeTaskLG, durationInputLGE, amountInputLGE])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLagStartValue: isTimeTaskLG ? durationInputLGS : amountInputLGS}))
	}, [isTimeTaskLG, durationInputLGS, amountInputLGS])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLeadActivityTarget: isTimeTaskLE ? durationInputLE : amountInputLE}))
	}, [isTimeTaskLE, durationInputLE, amountInputLE])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLagActivityVariation: selectedVariationLG}))
	}, [selectedVariationLG])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLeadActivityVariation: selectedVariationLE}))
	}, [selectedVariationLE])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {currentXP: xpCurrentInput}))
	}, [xpCurrentInput])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {seasonXpRatio: xpRatioInput}))
	}, [xpRatioInput])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalLagProjectionCurve: curveInput}))
	}, [curveInput])

	useEffect(()=>{
		setGoalObj(Object.assign({...goalObj}, {goalNote: noteInput}))
	}, [noteInput])

	return (
		<>
			<h2 className='-mb-1.5 flex gap-2'>Goal Text</h2>
			<InputText text={noteInput} setParentText={setNoteInput} />
			<h2 className='-mb-1.5'>Season</h2>
			<InputSeasonList selectedSeason={selectedSeason} setParentSeason={setSelectedSeason} />
			<h2 className='-mb-1.5'>Category</h2>
			<InputCategoryList selectedCategory={selectedCategory} setParentCategory={setSelectedCategory} />
			<h2 className='-mb-1.5'>Lag Measure</h2>
			<InputActivityList selectedActivity={selectedActivityLG} setParentActivity={setSelectedActivityLG} />
			<InputActivityVariationList activity={selectedActivityLG} setParentVariation={setSelectedVariationLG} />
			<div className="mr-auto flex gap-2 items-center">
				{ isTimeTaskLG ? <>
					<InputDuration timestamp={durationInputLGS} setParentTimestamp={setDurationInputLGS} />to
					<InputDuration timestamp={durationInputLGE} setParentTimestamp={setDurationInputLGE} />
				</> : <>
					<InputAmount amount={amountInputLGS} setParentAmount={setAmountInputLGS} />to
					<InputAmount amount={amountInputLGE} setParentAmount={setAmountInputLGE} />
				</> }
			</div>
			<div className="mr-auto flex gap-2 items-center">
				<InputGoalProjectionCurveList curve={curveInput} setParentCurve={setCurveInput} /> Projection
			</div>
			<h2 className='-mb-1.5'>Lead Measure</h2>
			<InputActivityList selectedActivity={selectedActivityLE} setParentActivity={setSelectedActivityLE} />
			<InputActivityVariationList activity={selectedActivityLE} setParentVariation={setSelectedVariationLE} />
			<div className="mr-auto flex gap-2 items-center">
				{ isTimeTaskLE ? <InputDuration timestamp={durationInputLE} setParentTimestamp={setDurationInputLE} />
					: <InputAmount amount={amountInputLE} setParentAmount={setAmountInputLE} /> }
			</div>
			<h2 className='-mb-1.5'>Current XP</h2>
			<InputAmount amount={xpCurrentInput} setParentAmount={setXpCurrentInput} />
			<h2 className='-mb-1.5'>XP Ratio</h2>
			<InputAmount amount={xpRatioInput} setParentAmount={setXpRatioInput} />
		</>
	)

}

export default connect(mapStateToProps)(InputGoal);