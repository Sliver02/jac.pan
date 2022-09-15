import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    // global reset
    *,
    *:after,
    *:before {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    // base global style
    html, 
    body {
        font-display: swap;
        scroll-behavior: smooth;
        height: -webkit-fill-available;

        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        line-height: 1.3;
    }
`;
