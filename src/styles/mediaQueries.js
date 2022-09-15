import { breakpoints } from './variables';
import { css } from 'styled-components';

const mediaQuery =
    (...query) =>
    (...rules) =>
        css`
            @media ${css(...query)} {
                ${css(...rules)}
            }
        `;

const media = {
    min: {
        xs: mediaQuery`screen and (min-width: ${breakpoints.xs}px)`,
        sm: mediaQuery`screen and (min-width: ${breakpoints.sm}px)`,
        md: mediaQuery`screen and (min-width: ${breakpoints.md}px)`,
        lg: mediaQuery`screen and (min-width: ${breakpoints.lg}px)`,
        xl: mediaQuery`screen and (min-width: ${breakpoints.xl}px)`,
        xxl: mediaQuery`screen and (min-width: ${breakpoints.xxl}px)`,
    },
    max: {
        xs: mediaQuery`screen and (max-width: ${breakpoints.xs - 1}px)`,
        sm: mediaQuery`screen and (max-width: ${breakpoints.sm - 1}px)`,
        md: mediaQuery`screen and (max-width: ${breakpoints.md - 1}px)`,
        lg: mediaQuery`screen and (max-width: ${breakpoints.lg - 1}px)`,
        xl: mediaQuery`screen and (max-width: ${breakpoints.xl - 1}px)`,
        xxl: mediaQuery`screen and (max-width: ${breakpoints.xxl - 1}px)`,
    },
};

export default media;
