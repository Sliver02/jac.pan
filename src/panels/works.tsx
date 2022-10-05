import media from '@styles/mediaQueries';
import { color } from '@styles/variables';
import styled, { css } from 'styled-components';
import { gsap } from '@utils/gsap.js';
import { useEffect, useRef } from 'react';

const TitleWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-family: 'Space Mono', monospace;
    font-size: 6rem;
    line-height: 0.8;
    background: ${color.black_trasparent};
    padding: 3rem;
    /* max-width: 100%; */
    transform: rotate(-100grad);

    ${media.min.md`
        transform: none;  
        padding: 4rem;
        font-size: 10rem;
    `}
`;

const StyledWorks = styled.div`
    width: 100%;
    height: 100%;
`;

const Works = () => {
    const titleWrapRef = useRef();
    const titleRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({});
    }, []);

    return (
        <StyledWorks>
            <TitleWrapper ref={titleWrapRef}>
                <Title ref={titleRef}>
                    Selected <br /> Works
                </Title>
            </TitleWrapper>
        </StyledWorks>
    );
};

export default Works;
