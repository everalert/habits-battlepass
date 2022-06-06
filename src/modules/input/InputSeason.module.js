import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputAmount from "../../elements/input/InputAmount.element";
import InputBool from "../../elements/input/InputBool.element";
import InputDateTime from "../../elements/input/InputDateTime.element";
import InputDuration from "../../elements/input/InputDuration.element";
import InputText from "../../elements/input/InputText.element";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";


const mapStateToProps = (state, ownProps) => {
	return {
		...state.season.opts,
		...ownProps
	}
}


function InputSeason({ seasonObj, setSeasonObj }) {

	const [titleInput, setTitleInput] = useState(seasonObj.title);
	const [descriptionInput, setDescriptionInput] = useState(seasonObj.description);
	const [startInput, setStartInput] = useState(seasonObj.start);
	const [lengthInput, setLengthInput] = useState(seasonObj.length);
	const [r1LaInput, setR1LaInput] = useState(seasonObj.reward1Label);
	const [r1LeInput, setR1LeInput] = useState(seasonObj.reward1Level);
	const [r1CInput, setR1CInput] = useState(seasonObj.reward1Claimed);
	const [r2LaInput, setR2LaInput] = useState(seasonObj.reward2Label);
	const [r2LeInput, setR2LeInput] = useState(seasonObj.reward2Level);
	const [r2CInput, setR2CInput] = useState(seasonObj.reward2Claimed);
	const [r3LaInput, setR3LaInput] = useState(seasonObj.reward3Label);
	const [r3LeInput, setR3LeInput] = useState(seasonObj.reward3Level);
	const [r3CInput, setR3CInput] = useState(seasonObj.reward3Claimed);
	const [r4LaInput, setR4LaInput] = useState(seasonObj.reward4Label);
	const [r4LeInput, setR4LeInput] = useState(seasonObj.reward4Level);
	const [r4CInput, setR4CInput] = useState(seasonObj.reward4Claimed);
	const [lvMaxInput, setLvMaxInput] = useState(seasonObj.levelMax);
	const [lvXPInput, setLvXPInput] = useState(seasonObj.levelXP);
	const [col1Input, setCol1Input] = useState(seasonObj.color1);
	const [col2Input, setCol2Input] = useState(seasonObj.color2);
	const [curLvInput, setCurLvInput] = useState(seasonObj.currentLevel);
	const [curXPInput, setCurXPInput] = useState(seasonObj.currentXP);

	useEffect(() => {
		setTitleInput(seasonObj.title);
		setDescriptionInput(seasonObj.description);
		setStartInput(seasonObj.start);
		setLengthInput(seasonObj.length);
		setR1LaInput(seasonObj.reward1Label);
		setR1LeInput(seasonObj.reward1Level);
		setR1CInput(seasonObj.reward1Claimed);
		setR2LaInput(seasonObj.reward2Label);
		setR2LeInput(seasonObj.reward2Level);
		setR2CInput(seasonObj.reward2Claimed);
		setR3LaInput(seasonObj.reward3Label);
		setR3LeInput(seasonObj.reward3Level);
		setR3CInput(seasonObj.reward3Claimed);
		setR4LaInput(seasonObj.reward4Label);
		setR4LeInput(seasonObj.reward4Level);
		setR4CInput(seasonObj.reward4Claimed);
		setLvMaxInput(seasonObj.levelMax);
		setLvXPInput(seasonObj.levelXP);
		setCol1Input(seasonObj.color1);
		setCol2Input(seasonObj.color2);
		setCurLvInput(seasonObj.currentLevel);
		setCurXPInput(seasonObj.currentXP);
	}, [seasonObj])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {title: titleInput}));
	}, [titleInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {description: descriptionInput}));
	}, [descriptionInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {start: startInput}));
	}, [startInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {title: lengthInput}));
	}, [lengthInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward1Label: r1LaInput}));
	}, [r1LaInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward1Level: r1LeInput}));
	}, [r1LeInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward1Claimed: r1CInput}));
	}, [r1CInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward2Label: r2LaInput}));
	}, [r2LaInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward2Level: r2LeInput}));
	}, [r2LeInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward2Claimed: r2CInput}));
	}, [r2CInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward3Label: r3LaInput}));
	}, [r3LaInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward3Level: r3LeInput}));
	}, [r3LeInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward3Claimed: r3CInput}));
	}, [r3CInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward4Label: r4LaInput}));
	}, [r4LaInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward4Level: r4LeInput}));
	}, [r4LeInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {reward4Claimed: r4CInput}));
	}, [r4CInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {levelMax: lvMaxInput}));
	}, [lvMaxInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {levelXP: lvXPInput}));
	}, [lvXPInput])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {color1: col1Input}));
	}, [col1Input])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {color2: col2Input}));
	}, [col2Input])

	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {currentLevel: curLvInput}));
	}, [curLvInput])
	useEffect(()=>{
		setSeasonObj(Object.assign({...seasonObj}, {currentXP: curXPInput}));
	}, [curXPInput])

	return (
		<>
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
		</>
	)

}

export default connect(mapStateToProps)(InputSeason);