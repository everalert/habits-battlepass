import TaskChallenge from "./TaskChallenge.module";

export default function TaskCollection(props) {
	return (
		<div className='TaskCollection'>
			<h3>{props.label}</h3>
			<TaskChallenge label='CHALLENGE' over={15} under={50} />
			<TaskChallenge label='CHALLENGE' over={15} under={50} />
			<TaskChallenge label='CHALLENGE' over={15} under={50} />
			<TaskChallenge label='CHALLENGE' over={15} under={50} />
		</div>
	);
}