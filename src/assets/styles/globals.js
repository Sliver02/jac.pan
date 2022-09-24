import styled, { createGlobalStyle, css } from 'styled-components';
import media from './mediaQueries';
import { fontSize, color } from './variables';

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

    main {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        
        ${media.min.md`
            overflow: hidden;
        `}
    }

    // base global style
    html, 
    body {
        font-family: 'Roboto Mono', monospace;
        font-display: swap;
        line-height: 1.6;

        scroll-behavior: smooth;
        height: -webkit-fill-available;

        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        background-color: ${color.dark};
        color: ${color.light};

        font-size: 16px;

        ${media.min.xxl`
            font-size: ${fontSize.xl}vw;
        `}
    }

    h1,h2,h3 {
        line-height: 1;
    }

    a, a:hover {
        color: white;
        text-decoration: none;
    }
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    cursor: pointer;
    display: inline-block;

    color: ${color.light};
    text-decoration: none;
    background-color: transparent;
    border: 1px solid ${color.light};

    padding: 0.8rem 1.5rem;
    transition: all 0.1s;

    font-family: 'Roboto Mono', monospace;
    font-display: swap;
    line-height: 1.6;

    &:hover,
    &:active {
        color: ${color.dark};
        background-color: ${color.light};
    }
`;
