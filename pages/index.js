import Head from 'next/head'
import styles from '../src/css/Home.module.css'
import Sidebar from '../src/modules/sidebar.module'
import Scoreboard from '../src/modules/scoreboard.module'

export default function Home() {
	return (
		<div className={styles.container}>
			<Scoreboard/>
			<Sidebar/>
		</div>
	)
}
