import { useD3 } from '../hooks/useD3'
import * as d3 from 'd3';

const data = {name:'xp',value:75000};

export default function RadialBar() {
	const ref = useD3(
		(svg) => {
			const maxValue = 100000;
			const height = 192;
			const width = 192;

			const PI = Math.PI;
			const arcWidth = 64;
			const innerRadius = (height-arcWidth)/2;
			const outerRadius = height/2;

			let svg2 = svg.select('.arc-container')
				.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

			let scale = d3.scaleLinear()
			.domain([0, maxValue])
			.range([0, 2 * PI]);

			let arcGen = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			// .startAngle(0)
			// .endAngle(scale(75000));

			let radialAxis = svg2.append('g')
				.attr('class', 'r axis')
				.selectAll('g')
				.data(data)
				.enter().append('g');
			
			radialAxis.append('circle')
				.attr('r', outerRadius)
				.style('fill','none');

			let arcs = svg2.append('g')
				.attr('class', 'data')
				.selectAll('path')
				.data([{startAngle:0, endAngle:-scale(data.value)}])
				.enter().append('path')
				.attr('class', 'arc')
				.style('fill', "#0000FF")
				.attr('d', arcGen)
			
			// arcs.transition()
			// 	.delay((d, i) => i * 200)
			// 	.duration(1000)
			// 	.attrTween('d', arcTween);
			
			// arcs.on('mousemove', showTooltip)
			// arcs.on('mouseout', hideTooltip)
			},
			[data.length]
		);

	  return (
		<svg ref={ref} style={{
			height: 192,
			width: 192,
			marginRight: "0px",
			marginLeft: "0px",
		}}>
			<g className='arc-container'/>
		</svg>
	  );
}