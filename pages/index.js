import Head from 'next/head'
import styles from '../src/css/Home.module.css'
import Sidebar from '../src/modules/Sidebar.module'
import Scoreboard from '../src/modules/Scoreboard.module'

export default function Home() {
	return (
		<div className={styles.container}>
			<Scoreboard/>
			<Sidebar/>
		</div>
	)
}
