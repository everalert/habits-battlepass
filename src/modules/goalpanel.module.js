import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'
import ItemValue from '../elements/item/ItemValue.element'
import StatPar from './stat/StatPar.module'
import StatTaskProgress from './stat/StatTaskProgress.module'

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
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label='DAILY' />
				<StatTaskProgress over={5} under={12} value={1000} unit='XP' label='WEEK 7' />
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