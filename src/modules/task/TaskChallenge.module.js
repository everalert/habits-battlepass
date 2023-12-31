import { connect } from 'react-redux';
import ItemNumber from "../../elements/item/ItemNumber.element";
import InputQuickLog from '../../modules/input/InputQuickLog.module';
import { FormatActivityValue } from "../../redux/helpers/Activity.helpers";
import { FormatChallengeLabel } from "../../redux/helpers/Challenge.helper";
import { GetLogEndValueForPeriod } from "../../redux/helpers/Log.helper";
import { useSpring, animated } from '@react-spring/web'


const AnimatedItemNumber = animated(ItemNumber);


const mapStateToProps = (state, ownProps) => {
	const activityId = ownProps.task.taskActivityId;
	return {
		logs: state.data.log.logs.filter(l => l.activityId === activityId),
		activity: state.data.activity.activities.find(a => a.id === activityId),
		...ownProps
	}
}


function TaskChallenge({ logs, activity, task, periodObj, timeFunc }) {

	const logEndValue = GetLogEndValueForPeriod(logs, activity.id, activity.isReportingIncremental, periodObj.start, periodObj.end, task.taskVariation);
	const completionRate = Math.min(logEndValue,task.taskAmount)/task.taskAmount*100;
	const label = FormatChallengeLabel(task, timeFunc, 'min');

	const { aReward, aProgress, aTarget } = useSpring({
		aReward: task.taskXP,
		aProgress: logEndValue,
		aTarget: task.taskAmount
	})

	return (
		<div className="clear-both flex flex-row-reverse gap-x-2 relative group">
			<div className="text-lg font-medium text-zinc-400 bg-zinc-900 rounded-md text-center tracking-tighter w-16 h-8 pt-[0.08rem] shrink-0"><AnimatedItemNumber num={aReward} /></div>
			<div className="flex-grow relative">
				<span className="tracking-tighter block float-left h-6 overflow-hidden">{label}</span>
				<span className="text-sm absolute top-0 right-0 pl-8 bg-gradient-to-r from-transparent via-black to-black">
					<span className="text-base font-bold"><AnimatedItemNumber num={aProgress.to(x => FormatActivityValue(activity, x, timeFunc).value)} /></span>
					<span>/</span>
					<span><AnimatedItemNumber num={aTarget.to(x => FormatActivityValue(activity, x, timeFunc).value)} /></span>
				</span>
				<div className="bg-zinc-900 w-full mt-[1.625rem] h-1.5 rounded -skew-x-[24deg] overflow-hidden relative">
					<div
						className='bg-zinc-500 w-full h-full absolute rounded-sm transition-all'
						style={{left:`${-100+completionRate}%`}}></div>
				</div>
			</div>
			<InputQuickLog activity={activity} variation={task.taskVariation} />
		</div>
	);

}

export default connect(mapStateToProps)(TaskChallenge);