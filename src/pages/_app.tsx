import { GlobalStyles } from '@assets/styles/globals';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
