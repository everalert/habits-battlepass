import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import InputAmount from "../../elements/input/InputAmount.element";
import InputBool from "../../elements/input/InputBool.element";
import InputDateTime from "../../elements/input/InputDateTime.element";
import InputDuration from "../../elements/input/InputDuration.element";
import InputResetButton from '../../elements/input/InputResetButton.element';
import InputSubmitButton from '../../elements/input/InputSubmitButton.element';
import InputText from "../../elements/input/InputText.element";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { addSeason } from "../../redux/slices/Season.slice";


const mapStateToProps = (state, ownProps) => {
	return {
		base: { ...state.season.base },
		...state.season.opts,
		...ownProps
	}
}


function InputSeason({ base, setParentOpen }) {

	const dispatch = useDispatch();

	const [titleInput, setTitleInput] = useState(base.title);
	const [descriptionInput, setDescriptionInput] = useState(base.description);
	const [startInput, setStartInput] = useState(GetCurrentUnixTimestamp());
	const [lengthInput, setLengthInput] = useState(base.length);
	const [r1LaInput, setR1LaInput] = useState(base.reward1Label);
	const [r1LeInput, setR1LeInput] = useState(base.reward1Level);
	const [r1CInput, setR1CInput] = useState(base.reward1Claimed);
	const [r2LaInput, setR2LaInput] = useState(base.reward2Label);
	const [r2LeInput, setR2LeInput] = useState(base.reward2Level);
	const [r2CInput, setR2CInput] = useState(base.reward2Claimed);
	const [r3LaInput, setR3LaInput] = useState(base.reward3Label);
	const [r3LeInput, setR3LeInput] = useState(base.reward3Level);
	const [r3CInput, setR3CInput] = useState(base.reward3Claimed);
	const [r4LaInput, setR4LaInput] = useState(base.reward4Label);
	const [r4LeInput, setR4LeInput] = useState(base.reward4Level);
	const [r4CInput, setR4CInput] = useState(base.reward4Claimed);
	const [lvMaxInput, setLvMaxInput] = useState(base.levelMax);
	const [lvXPInput, setLvXPInput] = useState(base.levelXP);
	const [col1Input, setCol1Input] = useState(base.color1);
	const [col2Input, setCol2Input] = useState(base.color2);
	const [curLvInput, setCurLvInput] = useState(base.currentLevel);
	const [curXPInput, setCurXPInput] = useState(base.currentXP);

	const resetForm = () => {
		setTitleInput(base.title);
		setDescriptionInput(base.description);
		setStartInput(GetCurrentUnixTimestamp());
		setLengthInput(base.length);
		setR1LaInput(base.reward1Label);
		setR1LeInput(base.reward1Level);
		setR1CInput(base.reward1Claimed);
		setR2LaInput(base.reward2Label);
		setR2LeInput(base.reward2Level);
		setR2CInput(base.reward2Claimed);
		setR3LaInput(base.reward3Label);
		setR3LeInput(base.reward3Level);
		setR3CInput(base.reward3Claimed);
		setR4LaInput(base.reward4Label);
		setR4LeInput(base.reward4Level);
		setR4CInput(base.reward4Claimed);
		setLvMaxInput(base.levelMax);
		setLvXPInput(base.levelXP);
		setCol1Input(base.color1);
		setCol2Input(base.color2);
		setCurLvInput(base.currentLevel);
		setCurXPInput(base.currentXP);
	}

	const submitForm = (event) => {
		event.preventDefault();

		const newSeason = Object.assign(base,{
			start: startInput,
			length: lengthInput,
			title: titleInput,
			description: descriptionInput,
			reward1Label: r1LaInput,
			reward1Claimed: r1CInput,
			reward1Level: r1LeInput,
			reward2Label: r2LaInput,
			reward2Claimed: r2CInput,
			reward2Level: r2LeInput,
			reward3Label: r3LaInput,
			reward3Claimed: r3CInput,
			reward3Level: r3LeInput,
			reward4Label: r4LaInput,
			reward4Claimed: r4CInput,
			reward4Level: r4LeInput,
			levelMax: lvMaxInput,
			levelXP: lvXPInput,
			color1: col1Input,
			color2: col2Input,
			currentXP: curXPInput,
			currentLevel: curLvInput
		});
		dispatch(addSeason(newSeason));
		resetForm();
		setParentOpen(false);
	}

	return (
		<form onSubmit={submitForm} className='text-sm flex flex-col justify-center gap-2'>
			<h2 className='-mb-1.5 flex gap-2'>Title</h2>
			<InputText text={titleInput} setParentText={setTitleInput} />
			<h2 className='-mb-1.5 flex gap-2'>Description</h2>
			<InputText text={descriptionInput} setParentText={setDescriptionInput} />
			<h2 className='-mb-1.5 flex gap-2'>Start</h2>
			<InputDateTime timestamp={startInput} setParentTimestamp={setStartInput} /> 
			<h2 className='-mb-1.5 flex gap-2'>Duration</h2>
			<InputDuration timestamp={lengthInput} setParentTimestamp={setLengthInput} showDay={true} />
			<h2 className='-mb-1.5 flex gap-2'>Reward 1</h2>
			<InputText text={r1LaInput} setParentText={setR1LaInput} />
			<div className="flex items-center gap-2"><InputAmount amount={r1LeInput} setParentAmount={setR1LeInput} /> Level</div>
			<div className="flex items-center gap-2"><InputBool bool={r1CInput} setParentBool={setR1CInput} /> Reward Claimed</div>
			<h2 className='-mb-1.5 flex gap-2'>Reward 2</h2>
			<InputText text={r2LaInput} setParentText={setR2LaInput} />
			<div className="flex items-center gap-2"><InputAmount amount={r2LeInput} setParentAmount={setR2LeInput} /> Level</div>
			<div className="flex items-center gap-2"><InputBool bool={r2CInput} setParentBool={setR2CInput} /> Reward Claimed</div>
			<h2 className='-mb-1.5 flex gap-2'>Reward 3</h2>
			<InputText text={r3LaInput} setParentText={setR3LaInput} />
			<div className="flex items-center gap-2"><InputAmount amount={r3LeInput} setParentAmount={setR3LeInput} /> Level</div>
			<div className="flex items-center gap-2"><InputBool bool={r3CInput} setParentBool={setR3CInput} /> Reward Claimed</div>
			<h2 className='-mb-1.5 flex gap-2'>Reward 4</h2>
			<InputText text={r4LaInput} setParentText={setR4LaInput} />
			<div className="flex items-center gap-2"><InputAmount amount={r4LeInput} setParentAmount={setR4LeInput} /> Level</div>
			<div className="flex items-center gap-2"><InputBool bool={r4CInput} setParentBool={setR4CInput} /> Reward Claimed</div>
			<h2 className='-mb-1.5 flex gap-2'>Max Level</h2>
			<InputAmount amount={lvMaxInput} setParentAmount={setLvMaxInput} />
			<h2 className='-mb-1.5 flex gap-2'>XP Per Level</h2>
			<InputAmount amount={lvXPInput} setParentAmount={setLvXPInput} />
			<h2 className='-mb-1.5 flex gap-2'>Color 1</h2>
			<InputText text={col1Input} setParentText={setCol1Input} />
			<h2 className='-mb-1.5 flex gap-2'>Color 2</h2>
			<InputText text={col2Input} setParentText={setCol2Input} />
			<h2 className='-mb-1.5 flex gap-2'>Current XP</h2>
			<InputAmount amount={curXPInput} setParentAmount={setCurXPInput} />
			<h2 className='-mb-1.5 flex gap-2'>Current Level</h2>
			<InputAmount amount={curLvInput} setParentAmount={setCurLvInput} />
			<div className='flex gap-3 ml-auto mt-1'>
				<InputResetButton resetFunc={resetForm} />
				<InputSubmitButton submitFunc={submitForm} />
			</div>
		</form>
	)

}

export default connect(mapStateToProps)(InputSeason);