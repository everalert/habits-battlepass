import { useState } from 'react'
import { connect } from 'react-redux'
import { GetCurrentUnixTimestamp } from '../../helpers/Math.helper'
import { getListsFromDataState } from '../../redux/data/Data.helpers'
import { GetGoalProjectedXpAtTime, GetGoalSuccessXp } from '../../redux/helpers/Goal.helper'


const offset = { x:12, y:0 }


const mapStateToProps = (state, ownProps) => {
	const timestamp = GetCurrentUnixTimestamp();
	const lists = getListsFromDataState(state.data);
	const goal = ownProps.goal;
	const season = lists.seasons.find(s => s.id === goal.seasonId);
	const category = lists.categories.find(c => c.id === goal.categoryId);
	const successXP = GetGoalSuccessXp(goal, season);
	return {
		icon: category.icon,
		parRate: Math.round(GetGoalProjectedXpAtTime(goal, season, timestamp))/successXP*100,
		currentRate: goal.currentXP/successXP*100,
		currentXP: goal.currentXP,
		successXP,
		...ownProps,
	}
}


function GoalProgressBar({ icon, parRate, currentRate, currentXP, successXP }) {

	const [popup, setPopup] = useState({ x:0, y:0, hidden:true });

	const updatePopup = (e) => {
		setPopup({ x:e.clientX+offset.x, y:e.clientY+offset.y, hidden:false });
	}

	const hidePopup = () => setPopup(Object.assign({}, popup, { hidden:true }));

	return (
		<div className='flex gap-1 w-4/5 mx-auto h-8 relative'>
			<div className='text-xl select-none'>{icon}</div>
			<div
				className="relative w-full h-3 mt-2 rounded-sm bg-zinc-900 overflow-hidden"
				onMouseMove={updatePopup} onMouseLeave={hidePopup}>
				<div
					className='bg-zinc-700 h-full w-full rounded-sm transition-all absolute'
					style={{left:`${-100+parRate}%`}}
				/>
				<div
					className='bg-zinc-300 h-full w-full rounded-sm transition-all absolute'
					style={{left:`${-100+currentRate}%`}}
				/>
			</div>
			<div
				className={`fixed rounded px-2 py-0.5 text-zinc-300 bg-black/75 ${popup.hidden ? 'hidden' : ''}`}
				style={{left:popup.x, top:popup.y}}>
					{`${currentXP}/${successXP} XP`}
			</div>
		</div>
	)

}

export default connect(mapStateToProps)(GoalProgressBar);