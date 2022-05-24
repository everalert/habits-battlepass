import InputQuickLog from '../../elements/input/InputQuickLog.element';
import ItemNumber from "../../elements/item/ItemNumber.element";
import { FormatActivityValue, GetActivityById } from "../../redux/helpers/Activity.helpers";
import { FormatChallengeLabel } from "../../redux/helpers/Challenge.helper";
import { GetLogEndValueForPeriod } from "../../redux/helpers/Log.helper";


export default function TaskChallenge({task, period, timeFunc}) {

	const logEndValue = GetLogEndValueForPeriod(task.taskActivityId, period.start, period.end);
	const activity = GetActivityById(task.taskActivityId);
	const target = FormatActivityValue(activity, task.taskAmount, timeFunc);
	const progress = FormatActivityValue(activity, logEndValue, timeFunc);
	const completionRate = Math.min(logEndValue,task.taskAmount)/task.taskAmount*100;
	const label = FormatChallengeLabel(task, timeFunc, 'min');
	const reward = task.taskXP;

	return (
		<div className="clear-both flex flex-row-reverse gap-x-2 relative group">
			<div className="text-lg font-medium text-zinc-400 bg-zinc-900 rounded-md text-center tracking-tighter w-16 h-8 pt-[0.08rem] shrink-0"><ItemNumber num={reward} /></div>
			<div className="flex-grow relative">
				<span className="tracking-tighter block float-left h-6 overflow-hidden">{label}</span>
				<span className="text-sm absolute top-0 right-0 pl-8 bg-gradient-to-r from-transparent via-black to-black">
					<span className="text-base font-bold"><ItemNumber num={progress.value} /></span>
					<span>/</span>
					<span><ItemNumber num={target.value} /></span>
				</span>
				<div className="bg-zinc-900 w-full mt-[1.625rem] h-1.5 rounded -skew-x-[24deg] overflow-hidden relative">
					<div
						className='bg-zinc-500 w-full h-full absolute rounded-sm transition-all'
						style={{left:`${-100+completionRate}%`}}></div>
				</div>
			</div>
			<InputQuickLog activity={activity} variation={task.variation} />
		</div>
	);

}