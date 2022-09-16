import { GlobalStyles } from '@styles/globals';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
