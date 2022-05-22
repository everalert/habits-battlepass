import React from 'react'
import { useSelector } from 'react-redux'

import RadialBar from '../elements/RadialBar.element'
import { GetCurrentUnixTimestamp } from '../helpers/Math.helper'

export default function SeasonPanel() {
	const season = useSelector((state) => state.season.seasons[state.season.active])
	const timeNow = GetCurrentUnixTimestamp()
	const timeEnd = season.start+season.length
	const timeRemain = timeEnd-timeNow
	return (
		<div className="w-96 my-12 text-center">
			<div className="relative w-72 h-72 mx-auto mb-6">
				<div className="iconProgressBar">
					<RadialBar size={288} value={season.currentXP} thickness={36} />
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 absolute top-4 left-4" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 0 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
				<div className="w-48 h-48 absolute top-12 left-12">
					<RadialBar size={192} value={season.currentXP%season.levelXP} max={season.levelXP} thickness={8} corner={1} delay={250} />
				</div>
				<div className="w-72 h-48 absolute top-20 left-0 text-9xl text-center text-black font-bold font-mono">{season.currentLevel}</div>
			</div>
			<h1 className='text-3xl font-bold tracking-widest uppercase'>{season.title}</h1>
			<h2 className='text-2xl tracking-tighter -mt-2 uppercase'>{Math.floor(timeRemain/86400)} days remain</h2>
		</div>
	)
}