import { GlobalStyles } from '@styles/globals';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
