import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import InputAmount from "../../elements/input/InputAmount.element";
import InputBool from "../../elements/input/InputBool.element";
import InputDateTime from "../../elements/input/InputDateTime.element";
import InputDuration from "../../elements/input/InputDuration.element";
import InputText from "../../elements/input/InputText.element";
import { GetCurrentUnixTimestamp } from "../../helpers/Math.helper";
import { Dialog, Tab } from '@headlessui/react';


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

	const rewards = [
		{ title: 'Tier 1', label: r1LaInput, labelF: setR1LaInput, level: r1LeInput, levelF: setR1LeInput, claim: r1CInput, claimF: setR1CInput },
		{ title: 'Tier 2', label: r2LaInput, labelF: setR2LaInput, level: r2LeInput, levelF: setR2LeInput, claim: r2CInput, claimF: setR2CInput },
		{ title: 'Tier 3', label: r3LaInput, labelF: setR3LaInput, level: r3LeInput, levelF: setR3LeInput, claim: r3CInput, claimF: setR3CInput },
		{ title: 'Tier 4', label: r4LaInput, labelF: setR4LaInput, level: r4LeInput, levelF: setR4LeInput, claim: r4CInput, claimF: setR4CInput },
	]
	
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
			<h2 className={`-mb-1.5 flex gap-2`}>Rewards</h2>
			<Tab.Group>
				<Tab.List className="flex flex-wrap gap-1 select-none">
					{ rewards.map((r,i) => <Tab key={i}>
						{({ selected }) => <h2 className={`-mb-1.5 py-1 px-2 flex rounded ${selected?'bg-zinc-600':'bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}>{r.title}</h2>}
					</Tab>)}
				</Tab.List>
				<Tab.Panels className="mt-1">
					{ rewards.map((r,i) => <Tab.Panel key={i}>
						<InputText text={r.label} setParentText={r.labelF} />
						<div className="flex items-center mt-1 gap-2"><InputAmount amount={r.level} setParentAmount={r.levelF} /> Level</div>
						<div className="flex items-center mt-1 gap-2"><InputBool bool={r.claim} setParentBool={r.claimF} /> Reward Claimed</div>
					</Tab.Panel>) }
				</Tab.Panels>
			</Tab.Group>
			<div className="flex gap-2">
				<div>
					<h2 className='flex gap-2'>Max Level</h2>
					<InputAmount amount={lvMaxInput} setParentAmount={setLvMaxInput} />
				</div>
				<div>
					<h2 className='flex gap-2'>XP Per Level</h2>
					<InputAmount amount={lvXPInput} setParentAmount={setLvXPInput} />
				</div>
			</div>
			<div className="flex gap-2">
				<div>
					<h2 className='flex gap-2'>Color 1</h2>
					<InputText text={col1Input} setParentText={setCol1Input} short={true} />
				</div>
				<div>
					<h2 className='flex gap-2'>Color 2</h2>
					<InputText text={col2Input} setParentText={setCol2Input} short={true} />
				</div>
			</div>
			<h2 className='-mb-1.5 flex gap-2'>Current XP</h2>
			<InputAmount amount={curXPInput} setParentAmount={setCurXPInput} />
			<h2 className='-mb-1.5 flex gap-2'>Current Level</h2>
			<InputAmount amount={curLvInput} setParentAmount={setCurLvInput} />
		</>
	)

}

export default connect(mapStateToProps)(InputSeason);