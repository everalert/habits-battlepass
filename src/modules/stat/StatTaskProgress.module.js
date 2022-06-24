import { connect } from 'react-redux';
import ItemFrac from '../../elements/item/ItemFrac.element';
import ItemNumber from '../../elements/item/ItemNumber.element';
import { getChallengeStatusAtTimestamp } from '../../redux/data/Data.helpers';
import { useSpring, animated } from '@react-spring/web'


const AnimatedItemFrac = animated(ItemFrac);
const AnimatedItemNumber = animated(ItemNumber);


const mapStateToProps = (state, ownProps) => {
	const { done, xp } = ((challenges, timestamp, state) => {
		let done = 0;
		let xp = 0;
		challenges.forEach(c => {
			const status = getChallengeStatusAtTimestamp(c, timestamp, state.data);
			done += status.done ? 1 : 0;
			xp += status.xp;
		})
		return { done, xp };
	})(ownProps.challenges, ownProps.timestamp, state);
	return {
		done,
		total: ownProps.challenges.length,
		xp,
		...ownProps
	}
}


function StatTaskProgress({ done, total, xp, label }) {

	const { aDone, aTotal, aXp } = useSpring({
		aDone: done,
		aTotal: total,
		aXp: xp,
	})

	return (
		<div className='text-center'>
			<AnimatedItemFrac over={aDone} under={aTotal} />
			<span className='ml-2'>
				<span className='text-lg'><AnimatedItemNumber num={aXp} /></span>
				<span className='text-base ml-1'>XP</span>
			</span>
			<span className="block text-lg italic -mt-1.5">{label}</span>
		</div>
	)

}

export default connect(mapStateToProps)(StatTaskProgress);