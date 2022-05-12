import ItemFrac from "../../elements/item/ItemFrac.element";

export default function TaskChallenge(props) {
	return (
		<div className="task">
			<div className="taskText">{props.label}</div>
			<div className="taskProgressText"><ItemFrac over={props.over} under={props.under} /></div>
			<div className="taskProgressBar">PROGRESS BAR</div>
		</div>
	);
}