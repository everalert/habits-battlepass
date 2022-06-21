import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterLogsByActivity } from '../../redux/data/Data.helpers';
import { GetPeriodOfSeason } from '../../redux/helpers/Season.helper';


const height = 128;
const width = 256;
const margin = { top: 8, right: 0, bottom: 8, left: 0 };
const steps = 128;

// const offset = { x:12, y:0 }

const mapData = (data, xMin, xDelta, yMin, yDelta) => {
	return data.map(d => {
		return {
			x: (d.x-xMin)/xDelta,
			y: (d.y-yMin)/yDelta
		}
	})
}

const generateLinearData = (steps, sign = 1) => {
	const output = [];
	const { s, d } = sign >= 0 ? { s:0, d:1 } : { s:1, d:-1 }
	for (let i=0; i<steps; i++)
		output.push({
			x: i/(steps-1),
			y: s+i/(steps-1)*d
		})
	return output;
}


const mapStateToProps = (state, ownProps) => {
	const goal = ownProps.goal;
	const season = state.data.season.seasons.find(s => s.id === goal.seasonId);
	const logs = state.data.log.logs;
	const { start, end } = GetPeriodOfSeason(season, season.length);
	const { goalLagActivityId: activityId, goalLagActivityVariation: activityVariation } = goal;
	return {
		season,
		data: filterLogsByActivity(logs, activityId, activityVariation)
			.map(l => { return { x: l.timestamp, y: l.value } })
			.sort((a,b) => a.x - b.x),
		xStart: start,
		xEnd:   end,
		xMin:   Math.min(start, end),
		xDelta: Math.abs(end-start),
		yStart: goal.goalLagStartValue,
		yEnd:   goal.goalLagEndValue,
		yMin:   Math.min(goal.goalLagStartValue, goal.goalLagEndValue),
		yDelta: Math.abs(goal.goalLagEndValue-goal.goalLagStartValue),
		ySign:  Math.sign(goal.goalLagEndValue-goal.goalLagStartValue),
		...ownProps
	}
}


function GoalProgressGraph({ data, xMin, xDelta, yMin, yDelta, ySign }) {

	const [actual, setActual] = useState(mapData(data, xMin, xDelta, yMin, yDelta))
	const [prediction, setPrediction] = useState(generateLinearData(steps, ySign))
	const [paths, setPaths] = useState({ prediction:'', actual:'' })

	const updatePaths = (updateFunc) => {
		const x = d3.scaleLinear()
			.domain(d3.extent([0, 1]))
			.range([0, width]);
		const y = d3.scaleLinear()
			.domain(d3.extent([0, 1]))
			.range([height - margin.bottom, margin.top]);
		const lineGen = d3.line()
			.x((d) => x(d.x))
			.y((d) => y(d.y))
			.curve(d3.curveCardinal);
		updateFunc({
			actual: lineGen(actual),
			prediction: lineGen(prediction),
		})
	}

	useEffect(()=>{
		setActual(mapData(data, xMin, xDelta, yMin, yDelta))
		updatePaths(setPaths);
	}, [data])

	useEffect(()=>{
		setPrediction(generateLinearData(steps, ySign));
	}, [ySign])

	// const [popup, setPopup] = useState({ x:0, y:0, hidden:true });

	// const updatePopup = (e) => {
	// 	setPopup({ x:e.clientX+offset.x, y:e.clientY+offset.y, hidden:false });
	// }

	// const hidePopup = () => setPopup(Object.assign({}, popup, { hidden:true }));

	return (<>
		<svg
			className='w-full h-full'
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio='none'
			// onMouseMove={updatePopup} onMouseLeave={hidePopup}
			>
				<g className="plot-area">
					<path d={paths.prediction} className='plot-prediction fill-transparent stroke-2 stroke-zinc-800'/>
					<path d={paths.actual} className='plot-value fill-transparent stroke-2 stroke-green-400'/>
				</g>
		</svg>
		{/* <div
			className={`fixed rounded px-2 py-0.5 text-zinc-300 bg-black/75 ${popup.hidden ? 'hidden' : ''}`}
			style={{left:popup.x, top:popup.y}}>
				{`XP`}
		</div> */}
	</>);

}

export default connect(mapStateToProps)(GoalProgressGraph)