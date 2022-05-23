import TaskChallenge from "./TaskChallenge.module";
import { FormatActivityValue, GetActivityById } from "../../redux/helpers/Activity.helpers";
import { FormatChallengeLabel, GetAllChallengesForGoalOfPeriod, GetChallengeProgressForPeriod } from "../../redux/helpers/Challenge.helper";
import { FormatNumber, SecondsToMinutes } from "../../helpers/Math.helper";
import { GetDayOfSeason, GetSeasonById, GetWeekOfSeason } from "../../redux/helpers/Season.helper";
import { GetGoalById } from "../../redux/helpers/Goal.helper";
import { GetLogEndValueForPeriod } from "../../redux/helpers/Log.helper";

export default function TaskCollection({goalId, period}) {
	const goal = GetGoalById(goalId);
	const tasks = GetAllChallengesForGoalOfPeriod(goal.id, period);
	const season = GetSeasonById(goal.seasonId);
	const { start, end } = period === 'daily' ? GetDayOfSeason(season) : GetWeekOfSeason(season);
	const timeFunc = s => FormatNumber(Math.floor(SecondsToMinutes(s)))
	tasks.forEach((t,i) => {
		let progress = GetLogEndValueForPeriod(t.taskActivityId, start, end);
		let activity = GetActivityById(t.taskActivityId);
		let formattedTarget = FormatActivityValue(activity, t.taskAmount, timeFunc);
		let formattedProgress = FormatActivityValue(activity, progress, timeFunc);
		let completionRate = Math.min(progress,t.taskAmount)/t.taskAmount*100;
		let formattedLabel = FormatChallengeLabel(t, timeFunc, 'min');
		tasks[i] = Object.assign({
			'formattedTarget':formattedTarget,
			'formattedProgress':formattedProgress,
			'completionRate':completionRate,
			'formattedLabel': formattedLabel
		}, t);
	});

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