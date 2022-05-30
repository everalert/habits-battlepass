import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputActivityList from '../../elements/input/InputActivityList.element';
import InputActivityVariationList from '../../elements/input/InputActivityVariationList.element';
import InputAmount from '../../elements/input/InputAmount.element';
import InputCategoryList from "../../elements/input/InputCategoryList.element";
import InputDuration from '../../elements/input/InputDuration.element';
import InputGoalProjectionCurveList from "../../elements/input/InputGoalProjectionCurveList.element";
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSeasonList from "../../elements/input/InputSeasonList.element";
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';
import InputText from "../../elements/input/InputText.element";
import { PrepareNewGoal } from "../../redux/helpers/Goal.helper";
import { addGoal } from "../../redux/slices/Goal.slice";


const mapStateToProps = (state, ownProps) => {
	return {
		firstActivity: state.activity.activities[0],
		firstCategory: state.category.categories[0],
		firstSeason: state.season.seasons[0],
		...state.goal.opts,
		...ownProps
	}
}


function InputGoal({ firstActivity, firstCategory, firstSeason, projectionCurve, setParentOpen }) {

	const dispatch = useDispatch();
	const blankGoal = PrepareNewGoal();

	const [selectedSeason, setSelectedSeason] = useState(firstSeason);
	const [selectedCategory, setSelectedCategory] = useState(firstCategory);

	const [selectedActivityLG, setSelectedActivityLG] = useState(firstActivity);
	const [selectedVariationLG, setSelectedVariationLG] = useState('');
	const [isTimeTaskLG, setIsTimeTaskLG] = useState(selectedActivityLG.type === 'time');
	const [selectedActivityLE, setSelectedActivityLE] = useState(firstActivity);
	const [selectedVariationLE, setSelectedVariationLE] = useState('');
	const [isTimeTaskLE, setIsTimeTaskLE] = useState(selectedActivityLE.type === 'time');

	useEffect(()=>{
		setIsTimeTaskLG(selectedActivityLG.type === 'time')
	}, [selectedActivityLG]);

	useEffect(()=>{
		setIsTimeTaskLE(selectedActivityLE.type === 'time')
	}, [selectedActivityLE]);

	const [noteInput, setNoteInput] = useState(blankGoal.goalNote);
	const [durationInputLGS, setDurationInputLGS] = useState(0); // TODO: pre-fill with current reported value
	const [durationInputLGE, setDurationInputLGE] = useState(0);
	const [durationInputLE, setDurationInputLE] = useState(0);
	const [amountInputLGS, setAmountInputLGS] = useState(0); // TODO: pre-fill with current reported value
	const [amountInputLGE, setAmountInputLGE] = useState(0);
	const [amountInputLE, setAmountInputLE] = useState(0);
	const [xpCurrentInput, setXpCurrentInput] = useState(0);
	const [xpRatioInput, setXpRatioInput] = useState(0);
	const [curveInput, setCurveInput] = useState(projectionCurve[0]);

	const resetForm = () => {
		setSelectedSeason(firstSeason);
		setSelectedCategory(firstCategory);
		setSelectedActivityLG(firstActivity);
		setSelectedActivityLE(firstActivity);
		setSelectedVariationLG('');
		setSelectedVariationLE('');
		setDurationInputLGS(0);
		setDurationInputLGE(0);
		setDurationInputLE(0);
		setAmountInputLGS(0);
		setAmountInputLGE(0);
		setAmountInputLE(0);
		setXpCurrentInput(0);
		setXpRatioInput(0);
		setCurveInput(projectionCurve[0]);
	}

	const submitForm = (event) => {
		event.preventDefault();
		const valueLGS = isTimeTaskLG ? durationInputLGS : amountInputLGS;
		const valueLGE = isTimeTaskLG ? durationInputLGE : amountInputLGE;
		const valueLE = isTimeTaskLE ? durationInputLE : amountInputLE;

		const newGoal = Object.assign(blankGoal,{
			seasonId: selectedSeason.id,
			categoryId: selectedCategory.id,
			goalLagActivityId: selectedActivityLG.id,
			goalLagActivityVariation: selectedVariationLG,
			goalLagStartValue: valueLGS,
			goalLagEndValue: valueLGE,
			goalLagProjectionCurve: curveInput,
			goalLeadActivityId: selectedActivityLE.id,
			goalLeadActivityTarget: valueLE,
			goalLeadActivityVariation: selectedVariationLE,
			goalNote: noteInput,
			currentXP: xpCurrentInput,
			seasonXpRatio: xpRatioInput
		});
		dispatch(addGoal(newGoal));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
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
				<InputGoalProjectionCurveList curve={curveInput} setParentCurve={setCurveInput} /> goal projection
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
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputGoal);