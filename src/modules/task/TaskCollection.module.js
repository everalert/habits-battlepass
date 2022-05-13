import TaskChallenge from "./TaskChallenge.module";

export default function TaskCollection(props) {
	return (
		<div className="w-11/12 mx-auto flex flex-col gap-2">
			<h3 className='text-lg font-bold tracking-tighter'>{props.label}</h3>
			<TaskChallenge label='Watch 2 episodes of anime' over={1} under={2} reward={1000} />
			<TaskChallenge label='Read 4 chapters of manga' over={3} under={4} reward={1000} />
			<TaskChallenge label='Listen to 60 minutes of radio' over={15} under={60} reward={2000} />
			<TaskChallenge label='Practice pitch accent for 15 minutes' over={5} under={15} reward={10000} />
		</div>
	);
}