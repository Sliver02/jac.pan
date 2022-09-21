import { color } from '@assets/styles/variables';
import GlobalContext from '@pages/globalContext';
import { useContext } from 'react';
import styled, { css } from 'styled-components';

const Dot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    background: ${color.white};
    opacity: 0;
    transform: translate(200%, 0);
    transition: transform 0.5s, opacity 1s;

    margin-right: 0.5rem;

    ${(props) =>
        !!props.active &&
        css`
            opacity: 1;
            transform: translate(0, 0);
        `}
`;

const StyledDots = styled.div`
    position: fixed;
    bottom: 3rem;
    left: 5rem;
    display: flex;
    z-index: 1;
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
