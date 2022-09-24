import { breakpoints, color } from '@assets/styles/variables';
import useMedia from '@utils/hooks/useMedia';
import useMouse from '@utils/hooks/useMouse';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from '@utils/gsap.js';

const StyledMouseFollow = styled.div`
    position: fixed;
    z-index: 3;
    background: ${color.white};
    opacity: 0.1;
    pointer-events: none;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    transform: translate(-50%, -50%);
`;

const MouseFollow = () => {
    const mousePos = useMouse();
    const isDesktop = useMedia([breakpoints.md]);
    const followerRef = useRef(null);

    useEffect(() => {
        if (!followerRef || isDesktop == null) {
            return;
        }

        gsap.to(followerRef.current, {
            x: mousePos.x,
            y: mousePos.y,
            ease: 'ease',
        });
    }, [isDesktop, mousePos]);

    return <StyledMouseFollow ref={followerRef} />;
};

export default MouseFollow;
