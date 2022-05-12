import RadialBar from '../elements/radialbar.element'

export default function SeasonPanel() {
	 return (
			<div className="season">
				<div className="seasonIcon">
					<div className="iconText">77</div>
					<div className="iconImage">SEASON SVG ICON</div>
					<div className="iconProgressBar"><RadialBar size={308} value={85000} thickness={40} /></div>
					<div className="iconSubProgressBar"><RadialBar size={256} value={900} max={1000} thickness={4} corner={1} delay={250} /></div>
				</div>
				<h1>ALIGNMENT</h1>
				<h2>55 DAYS REMAIN</h2>
			</div>
	)
}