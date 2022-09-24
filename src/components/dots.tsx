import media from '@assets/styles/mediaQueries';
import { color } from '@assets/styles/variables';
import GlobalContext from '@utils/globalContext';
import { useContext } from 'react';
import styled, { css } from 'styled-components';

const active = css`
    transform: translate(0, 0);
    opacity: 1;
`;

const Dot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    background: ${color.white};
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
    transform: translate(0, -200%);

    margin-top: 0.5rem;

    ${media.min.md`
        transform: translate(200%, 0);
        margin-top: 0;
        margin-right: 0.5rem;

        ${(props) => !!props.active && active}
    `}

    ${(props) => !!props.active && active}
`;

const StyledDots = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    bottom: 2rem;
    left: 2rem;
    z-index: 1;

    ${media.min.md`
        bottom: 3rem;
        left: 5rem;
        flex-direction: row;
    `}
`;

const Dots = () => {
    const { pages, panelIndex } = useContext(GlobalContext);

    return (
        <StyledDots>
            {pages.map((page, index) => (
                <Dot key={index} active={panelIndex >= index}></Dot>
            ))}
        </StyledDots>
    );
};

export default Dots;
