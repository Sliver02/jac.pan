import { GlobalStyles } from '@assets/styles/globals';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
