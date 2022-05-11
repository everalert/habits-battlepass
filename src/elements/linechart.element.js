import { useD3 } from '../hooks/useD3'
import * as d3 from 'd3';

const data = [
	{year: 1980, efficiency: 24.3, sales: 8949000},
	{year: 1985, efficiency: 27.6, sales: 10979000},
	{year: 1990, efficiency: 28, sales: 9303000},
	{year: 1991, efficiency: 28.4, sales: 8185000},
	{year: 1992, efficiency: 27.9, sales: 8213000},
	{year: 1993, efficiency: 28.4, sales: 8518000},
	{year: 1994, efficiency: 28.3, sales: 8991000},
	{year: 1995, efficiency: 28.6, sales: 8620000},
	{year: 1996, efficiency: 28.5, sales: 8479000},
	{year: 1997, efficiency: 28.7, sales: 8217000},
	{year: 1998, efficiency: 28.8, sales: 8085000},
	{year: 1999, efficiency: 28.3, sales: 8638000},
	{year: 2000, efficiency: 28.5, sales: 8778000},
	{year: 2001, efficiency: 28.8, sales: 8352000},
	{year: 2002, efficiency: 29, sales: 8042000},
	{year: 2003, efficiency: 29.5, sales: 7556000},
	{year: 2004, efficiency: 29.5, sales: 7483000},
	{year: 2005, efficiency: 30.3, sales: 7660000},
	{year: 2006, efficiency: 30.1, sales: 7762000},
	{year: 2007, efficiency: 31.2, sales: 7562000},
	{year: 2008, efficiency: 31.5, sales: 6769000},
	{year: 2009, efficiency: 32.9, sales: 5402000},
	{year: 2010, efficiency: 33.9, sales: 5636000},
	{year: 2011, efficiency: 33.1, sales: 6093000},
	{year: 2012, efficiency: 35.3, sales: 7245000},
	{year: 2013, efficiency: 36.4, sales: 7586000},
	{year: 2014, efficiency: 36.5, sales: 7708000},
	{year: 2015, efficiency: 37.2, sales: 7517000},
	{year: 2016, efficiency: 37.7, sales: 6873000},
	{year: 2017, efficiency: 39.4, sales: 6081000},
];

export default function LineChart() {
	const ref = useD3(
		(svg) => {
			const height = 128;
			const width = 160;
			const margin = { top: 8, right: 0, bottom: 8, left: 0 };
		
			const years = data.map(d => d.year)
			const efficiency = data.map(d => d.efficiency)
			const sales = data.map(d => d.sales)

			const x = d3.scaleLinear()
				.domain([d3.min(years),d3.max(years)])
				.range([0, width]);
		
			const y1 = d3.scaleLinear()
				.domain([d3.min(sales),d3.max(sales)])
				.range([height - margin.bottom, margin.top]);
	
			const y2 = d3.scaleLinear()
				.domain([d3.min(efficiency),d3.max(efficiency)])
				.range([height - margin.bottom, margin.top]);
		
			const lineGen1 = d3.line()
				.x((d) => x(d.year))
				.y((d) => y1(d.sales));
		
			const lineGen2 = d3.line()
				.x((d) => x(d.year))
				.y((d) => y2(d.efficiency));
		
			svg
				.select(".plot-area")
				.append('path')
				.attr('d',lineGen1(data))
				.style('fill','none')
				.style('stroke','#888')
			svg
				.select(".plot-area")
				.append('path')
				.attr('d',lineGen2(data))
				.style('fill','none')
				.style('stroke','#AAA')
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
			<g className="plot-area" />
		</svg>
	);
}