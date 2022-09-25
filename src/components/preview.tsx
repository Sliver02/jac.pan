import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap, ScrollTrigger, Draggable } from '@utils/gsap.js';

const StyledPreview = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const ProfilePicContainer = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 30rem;
`;

const Preview = () => {
    const ContainerRef = useRef(null);
    const profilePicRef = useRef(null);

    const shake = (scale) => {
        gsap.to(profilePicRef.current, {
            scale: scale,
            duration: 0.01,
        });
    };

    useEffect(() => {
        if (!ContainerRef || !profilePicRef) {
            return;
        }

        Draggable.create(profilePicRef.current, {
            type: 'x,y',
            bounds: ContainerRef.current,
            edgeResistance: 0.65,
            onPress: () => shake(1.05),
            onRelease: () => shake(1),
        });
    }, [profilePicRef]);

    const handleClick = (e) => {
        console.log(e);
        console.log('clicked');
        if (e.eventType === 'MouseDown') {
            console.log('clicked');
        } else if (e.eventType === 'MouseUp') {
            console.log('lifted');
        }
    };

    return (
        <StyledPreview ref={ContainerRef}>
            <ProfilePicContainer ref={profilePicRef} onMouseDown={(e) => handleClick(e)}>
                <Image
                    src="/img/me2.jpg"
                    alt="profile pic"
                    layout="responsive"
                    width="960"
                    height="1280"
                />
            </ProfilePicContainer>
        </StyledPreview>
    );
};

export default Preview;
