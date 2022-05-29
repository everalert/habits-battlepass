import { FormatNumber, SecondsToMinutes } from "../../helpers/Math.helper";
import TaskChallenge from "./TaskChallenge.module";


export default function TaskCollection({ tasks, periodObj }) {
	
	const timeFunc = s => FormatNumber(Math.floor(SecondsToMinutes(s)))

	return (
		<div className="w-[19rem] mx-auto flex flex-col gap-2">
			{ tasks.map(t => (<TaskChallenge key={t.id} task={t} periodObj={periodObj} timeFunc={timeFunc} />))}
		</div>
	);

}