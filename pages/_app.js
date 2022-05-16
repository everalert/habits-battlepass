import '../src/css/globals.css'
import { Provider } from 'react-redux'
import { store } from '../src/redux/ReduxStore'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
