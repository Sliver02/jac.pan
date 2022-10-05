import { color } from '@styles/variables';
import useMouse from '@utils/hooks/useMouse';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from '@utils/gsap.js';

const StyledMouseFollow = styled.div`
    position: fixed;
    z-index: 3;
    background: ${color.black_trasparent};
    opacity: 0;
    pointer-events: none;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    mix-blend-mode: overlay;
`;

const MouseFollow = () => {
    const mousePos = useMouse();
    const followerRef = useRef(null);

    useEffect(() => {
        if (!followerRef) {
            return;
        }

        gsap.fromTo(
            followerRef.current,
            {
                scale: 0,
                opacity: 0,
                xPercent: -50,
                yPercent: -50,
            },
            {
                scale: 1,
                opacity: 0.3,
                delay: 0.5,
                duration: 0.2,
                ease: 'easeOut',
            }
        );
    }, []);

    useEffect(() => {
        if (!followerRef || !mousePos) {
            return;
        }

        if (mousePos.x > 0 && mousePos.y > 0) {
            gsap.to(followerRef.current, {
                x: mousePos.x,
                y: mousePos.y,

                ease: 'easeOut',
            });
        }
    }, [mousePos]);

    return <StyledMouseFollow ref={followerRef} />;
};

export default MouseFollow;
