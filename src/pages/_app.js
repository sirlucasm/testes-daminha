import Head from 'next/head';
import GlobalStyles from '../styles/globals.jsx';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=1.0, user-scalable=no" />
			</Head>
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp
