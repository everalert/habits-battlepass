import * as d3 from 'd3';
import { useState } from 'react';
import { clamp } from '../helpers/Math.helper';


const offset = { x:12, y:0 }


export default function RadialBar({ value, max, thickness, corner, label }) {

	const outerRadius = 64;
	const innerRadius = thickness ? outerRadius-clamp(thickness, 0.01, 0.9)*outerRadius : 48;
	const arcCornerRadius = corner ? Math.max(corner, 0) : 2;
	
	const arc = d3.arc()
	.innerRadius(innerRadius)
	.outerRadius(outerRadius)
	.cornerRadius(arcCornerRadius)
	.startAngle(0)
	.endAngle(-2 * Math.PI * value/max)

	const [popup, setPopup] = useState({ x:0, y:0, hidden:true });

	const updatePopup = (e) => {
		setPopup({ x:e.clientX+offset.x, y:e.clientY+offset.y, hidden:false });
	}

	const hidePopup = () => setPopup(Object.assign({}, popup, { hidden:true }));

	return (<>
		<svg
			className='h-full w-full'
			viewBox="0 0 128 128"
		>
			<g
				className='arc-container translate-x-16 translate-y-16'
				onMouseMove={updatePopup}
				onMouseLeave={hidePopup}
			>
				<path d={arc()} className='fill-blue-700' />
			</g>
		</svg>
		<div
			className={`fixed rounded px-2 py-0.5 text-zinc-300 bg-black/75 ${popup.hidden ? 'hidden' : ''}`}
			style={{left:popup.x, top:popup.y}}>
				{`${value} ${label}`}
		</div>
	</>);
}