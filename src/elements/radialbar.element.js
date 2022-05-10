import React from "react";
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';

export default function RadialBar(props) {
	const data = {
		name: 'XP',
		value: props.value ? props.value : 50000,
		maxValue: props.max ? props.max : 100000,
		interval: props.ivl ? Math.max(props.ivl, 0) : 0
	};
	const size = props.size ? props.size : 192;
	const arcWidth = props.thickness ? Math.min(props.thickness, size) : 64;
	const delay = props.delay ? Math.max(props.delay, 0) : 0;

	const arcCornerRadius = props.corner ? Math.max(props.corner, 0) : 2;

	const ref = useD3(
		(svg) => {
			const PI = Math.PI;
			const outerRadius = size/2;
			const innerRadius = outerRadius-arcWidth;

			let svg2 = svg.select('.arc-container')
				.attr('transform', 'translate(' + size / 2 + ',' + size / 2 + ')')
				.select('.arcs');

			let scale = d3.scaleLinear()
				.domain([0, data.interval>0 ? data.interval : data.maxValue])
				.range([0, 2 * PI]);

			let arcGen = d3.arc()
				.startAngle(0)
				.innerRadius(innerRadius)
				.outerRadius(outerRadius)
				.cornerRadius(arcCornerRadius);

			let arcTween = (d) => {
				return (t) => {
					const angle = d3.interpolate(d.startAngle, d.endAngle)(t);
					arcGen.endAngle(angle);
					return arcGen(null);
				}
			}

			let colTween = (d) => {
				return (t) => {
					const colour = d3.interpolate(127, data.value/data.maxValue*128+127)(t);
					return `rgb(0,0,${colour})`;
				}
			}

			let radialAxis = svg2
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
				.data([{startAngle:0, endAngle:-scale(data.value^data.interval)}])
				.enter().append('path')
				.attr('class', 'arc')
				.attr('fill', "#0000FF")
				//.attr('d', arcGen)
			
			arcs.transition()
				.delay(delay)
				.duration(1000)
				.attrTween("fill", colTween)
				.attrTween('d', arcTween);
			
			// arcs.on('mousemove', showTooltip)
			// arcs.on('mouseout', hideTooltip)
			},
			[data.length]
		);

	  return (
		<svg ref={ref} style={{
			height: size,
			width: size,
		}}>
			<g className='arc-container'>
				<g className='arcs'/>
			</g>
		</svg>
	  );
}