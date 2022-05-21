import TaskChallenge from "./TaskChallenge.module";
import { FormatActivityValue, GetActivityById, GetActivityUnit } from "../../redux/helpers/Activity.helpers";
import { FormatChallengeLabel, GetAllChallengesForGoalOfPeriod } from "../../redux/helpers/Challenge.helper";
import { SecondsToMinutes } from "../../helpers/Math.helper";

export default function TaskCollection({goalId, period}) {
	const tasks = GetAllChallengesForGoalOfPeriod(goalId, period)
	const timeFunc = s => Math.floor(SecondsToMinutes(s))
	for (let t in tasks) {
		let activity = GetActivityById(tasks[t].taskActivityId)
		let formattedTarget = FormatActivityValue(activity, tasks[t].taskAmount, timeFunc)
		let formattedProgress = FormatActivityValue(activity, 0, timeFunc)
		let completionRate = 0/tasks[t].taskAmount*100
		let formattedLabel = FormatChallengeLabel(tasks[t], timeFunc, 'min')
		tasks[t] = Object.assign({
			'formattedTarget':formattedTarget,
			'formattedProgress':formattedProgress,
			'completionRate':completionRate,
			'formattedLabel': formattedLabel
		},tasks[t])
	}
	return (
		<div className="w-[19rem] mx-auto flex flex-col gap-2">
			{tasks.map(t => (
				<TaskChallenge
					key={t.id}
					label={t.formattedLabel}
					completionRate={t.completionRate}
					progress={t.formattedProgress.value}
					target={t.formattedTarget.value}
					reward={t.taskXP} />
			))}
		</div>
	);
}