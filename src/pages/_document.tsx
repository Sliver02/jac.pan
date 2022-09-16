import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

function MyDocument() {
    return (
        <Html>
            <Head>
                <link
                    rel="preconnect"
                    as="style"
                    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Space+Mono:700&display=swap"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Space+Mono:700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Space+Mono:700&display=swap"
                />

                <link
                    rel="preconnect"
                    as="style"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    as="style"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                />

                <link
                    rel="preconnect"
                    as="style"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } finally {
        sheet.seal();
    }
};

export default MyDocument;
