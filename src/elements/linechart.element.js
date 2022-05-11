import { useD3 } from '../hooks/useD3'
import * as d3 from 'd3';

const data = [];
const days = 91;
const delta = -10;
for (let i=0; i<days; i++)
	data.push({date:i, par:i/days*delta, value:i/days*delta+delta/days*5*(Math.random()-0.5)})

export default function LineChart() {
	const ref = useD3(
		(svg) => {
			const height = 128;
			const width = 160;
			const margin = { top: 8, right: 0, bottom: 8, left: 0 };
		
			const date = data.map(d => d.date)
			const par = data.map(d => d.par)
			const value = data.map(d => d.value)

			const x = d3.scaleLinear()
				.domain([d3.min(date),d3.max(date)])
				.range([0, width]);
		
			const y1 = d3.scaleLinear()
				.domain([d3.min(value),d3.max(value)])
				.range([height - margin.bottom, margin.top]);
	
			const y2 = d3.scaleLinear()
				.domain([d3.min(par),d3.max(par)])
				.range([height - margin.bottom, margin.top]);
		
			const lineGen1 = d3.line()
				.x((d) => x(d.date))
				.y((d) => y1(d.value));
		
			const lineGen2 = d3.line()
				.x((d) => x(d.date))
				.y((d) => y2(d.par));
		
			svg
				.select(".plot-prediction")
				.attr('d',lineGen2(data))
				.style('fill','none')
				.style('stroke','#444')
			svg
				.select(".plot-value")
				.attr('d',lineGen1(data))
				.style('fill','none')
				.style('stroke','#888')
		},
		[data.length]
	);

	return (
		<svg ref={ref} style={{
			height: 128,
			width: 160,
			margin: "0px",
			padding: "0px",
		}}>
			<g className="plot-area">
				<path className='plot-prediction'/>
				<path className='plot-value'/>
			</g>
		</svg>
	);
}