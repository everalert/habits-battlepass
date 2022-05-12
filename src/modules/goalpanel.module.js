import LineChart from '../elements/LineChart.element'
import RadialBar from '../elements/RadialBar.element'

export default function GoalPanel() {
	 return (
		<div className="goal">
			<h1><span className="goalStart">START VALUE</span> to <span className="goalEnd">GOAL VALUE</span></h1>
			<h2>CATEGORY NAME</h2>
			<div className="categoryIcon">
				<div className="iconImage">CATEGORY SVG</div>
				<div className="iconProgressBar"><RadialBar size={128} value={15000} max={25000} thickness={8} corner={1} delay={500} /></div>
			</div>
			<div className="lagMeasureGraph"><LineChart/></div>
			<div className="stats">
				<div className="statItem">
					<div className="statItemAbs"><span className="statItemValue">500</span><span className="statItemUnit">XP</span></div>
					<div className="statItemPar"><span className="statItemText">PAR</span><span className="statItemSign">XP</span><span className="statItemValue">500</span><span className="statItemUnit">XP</span></div>
				</div>
				<div className="statItem">
					<div className="statItemAbs"><span className="statItemValue">500</span><span className="statItemUnit">XP</span></div>
					<div className="statItemPar"><span className="statItemText">PAR</span><span className="statItemSign">XP</span><span className="statItemValue">500</span><span className="statItemUnit">XP</span></div>
				</div>
				<div className="statItem">
					<div className="statItemFrac"><span className="statItemValue">5</span><span className="statItemUnit">/</span><span className="statItemUnit">12</span></div>
					<div className="statItemAbs"><span className="statItemValue">1,000</span><span className="statItemUnit">XP</span></div>
					<div className="statItemLabel"><span className="statItemText">DAILY</span></div>
				</div>
				<div className="statItem">
					<div className="statItemFrac"><span className="statItemValue">5</span><span className="statItemUnit">/</span><span className="statItemUnit">12</span></div>
					<div className="statItemAbs"><span className="statItemValue">1,000</span><span className="statItemUnit">XP</span></div>
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