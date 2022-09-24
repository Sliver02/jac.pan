import { color } from '@assets/styles/variables';
import { createRefs } from '@utils/utility';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from '@utils/gsap.js';
import useMouse from '@utils/hooks/useMouse';

const Particle = styled.div`
    width: 1rem;
    height: 1rem;
    background: ${color.white};
    position: absolute;

    ${(props) => css`
        top: ${props.top}%;
        left: ${props.left}%;
    `}
`;

const StyledParticles = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
`;

const Particles = () => {
    const particlesRef = useRef([]);
    const mousePos = useMouse();

    const movingValue = [5, -9, -5];
    const opacityValue = [0.05, 0.4, 0.2];
    const wabbleCoef = 250;

    useEffect(() => {
        if (!particlesRef) {
            return;
        }

        console.log(particlesRef);

        particlesRef.current.forEach((particle, index) => {
            gsap.to(particle, {
                x: (mousePos.x * movingValue[index]) / wabbleCoef,
                y: (mousePos.y * movingValue[index]) / wabbleCoef,
                opacity: opacityValue[index],
            });
        });
    }, [particlesRef, mousePos]);

    return (
        <StyledParticles>
            <Particle top={20} left={30} ref={(e) => createRefs(particlesRef, e, 0)} />
            <Particle top={40} left={80} ref={(e) => createRefs(particlesRef, e, 1)} />
            <Particle top={70} left={20} ref={(e) => createRefs(particlesRef, e, 2)} />
        </StyledParticles>
    );
};

export default Particles;
