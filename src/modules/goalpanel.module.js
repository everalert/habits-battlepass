import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import ItemValue from '../elements/ItemValue.element'
import ItemDelta from '../elements/ItemDelta.element'
import StatPar from './stat/StatPar.module'

export default function GoalPanel() {
	 return (
		<div className="goal">
			<h1><ItemValue value={10000} unit='語'/> to <ItemValue value={15000} unit='語'/></h1>
			<h2>CATEGORY NAME</h2>
			<div className="categoryIcon">
				<div className="iconImage">CATEGORY SVG</div>
				<div className="iconProgressBar"><RadialBar size={128} value={15000} max={25000} thickness={8} corner={1} delay={500} /></div>
			</div>
			<div className="lagMeasureGraph"><LineChart/></div>
			<div className="stats">
				<StatPar abs={500} rel={500} unit='XP' />
				<StatPar abs={500} rel={500} unit='語' />
				<div className="statItem">
					<div className="statItemFrac"><span className="statItemValue">5</span><span className="statItemUnit">/</span><span className="statItemUnit">12</span></div>
					<ItemValue value={1000} unit='XP'/>
					<div className="statItemLabel"><span className="statItemText">DAILY</span></div>
				</div>
				<div className="statItem">
					<div className="statItemFrac"><span className="statItemValue">5</span><span className="statItemUnit">/</span><span className="statItemUnit">12</span></div>
					<ItemValue value={1000} unit='XP'/>
					<div className="statItemLabel"><span className="statItemText">WEEK 7</span></div>
				</div>
			</div>
			<div className="challenges">
				<div className="challengesDaily">
					<h3>DAILY</h3>
					<div className="task">
						<div className="taskText">CHALLENGE TEXT</div>
						<div className="taskProgressText">CHALLENGE PROGRESS</div>
						<div className="taskProgressBar">PROGRESS BAR</div>
					</div>
				</div>
				<div className="challengesWeekly">
					<h3>WEEKLY</h3>
					<div className="task">
						<div className="taskText">CHALLENGE TEXT</div>
						<div className="taskProgressText">CHALLENGE PROGRESS</div>
						<div className="taskProgressBar">PROGRESS BAR</div>
					</div>
				</div>
			</div>
		</div>
	)
}