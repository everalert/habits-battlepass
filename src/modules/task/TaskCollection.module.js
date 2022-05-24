import { FormatNumber, SecondsToMinutes } from "../../helpers/Math.helper";
import { GetAllChallengesForGoalOfPeriod } from "../../redux/helpers/Challenge.helper";
import { GetGoalById } from "../../redux/helpers/Goal.helper";
import { GetDayOfSeason, GetSeasonById, GetWeekOfSeason } from "../../redux/helpers/Season.helper";
import TaskChallenge from "./TaskChallenge.module";

export default function TaskCollection({goalId, period}) {
	const goal = GetGoalById(goalId);
	const tasks = GetAllChallengesForGoalOfPeriod(goal.id, period);
	const season = GetSeasonById(goal.seasonId);
	const timeFunc = s => FormatNumber(Math.floor(SecondsToMinutes(s)))
	const periodObj = period === 'daily' ? GetDayOfSeason(season) : GetWeekOfSeason(season);

	return (
		<div className="w-[19rem] mx-auto flex flex-col gap-2">
			{ tasks.map(t => (<TaskChallenge key={t.id} task={t} period={periodObj} timeFunc={timeFunc} />))}
		</div>
	);
}