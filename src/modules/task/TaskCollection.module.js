import TaskChallenge from "./TaskChallenge.module";
import { useSelector } from "react-redux";

export default function TaskCollection(props) {
	const tasks = useSelector((state) => state.challenge.challenges.filter(c => c.goalId === props.goal && c.period === props.period))
	for (let t in tasks) {
		let activity = useSelector((state) => state.activity.activities.find(a => a.id === t.taskActivityId))
		t = Object.assign(t,{'activityData':activity})
	}
	return (
		<div className="w-[19rem] mx-auto flex flex-col gap-2">
			{tasks.map(t => (
				<TaskChallenge label={t.taskLabel} over={0} under={t.taskAmount} reward={t.taskXP} />
			))}
		</div>
	);
}