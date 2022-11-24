import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap, ScrollTrigger, Draggable } from '@utils/gsap.js';
import { breakpoints, color } from '@styles/variables';
import media from '@styles/mediaQueries';
import useMedia from '@utils/hooks/useMedia';

const StyledPreview = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;

    ${media.min.md`
        padding: 8rem;
    `}
`;

const ProfilePicContainer = styled.div`
    width: 60vw;
    background: ${color.black_trasparent};
    margin-top: 2rem;

    ${media.min.md`
        position: absolute;
        top: 10rem;
        right: 5rem;
        width: 25rem;
        margin-top: 0;
    `}
`;

const PicDesc = styled.div`
    width: 100%;
    padding: 0.8rem 1rem 1rem;
    text-align: left;
`;

const Quote = styled.div`
    font-family: 'Space Mono', monospace;
    font-size: 2.2rem;
    letter-spacing: 1rem;
    margin-bottom: auto;
    line-height: 1;

    ${media.min.md`
        width: 80%;
        font-size: 4rem;
    `}
`;

const TextWrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-break: keep-all;

    p {
        max-width: 30rem;
    }

    p + p {
        margin-top: 1rem;
    }
`;

const Preview = () => {
    const ContainerRef = useRef(null);
    const profilePicRef = useRef(null);
    const isDesktop = useMedia([breakpoints.md]);

    const shake = (scale) => {
        gsap.to(profilePicRef.current, {
            scale: scale,
            duration: 0.01,
        });
    };

    useEffect(() => {
        if (!ContainerRef || !profilePicRef || !isDesktop) {
            return;
        }

        if (!!isDesktop) {
            Draggable.create(profilePicRef.current, {
                type: 'x,y',
                bounds: ContainerRef.current,
                edgeResistance: 0.65,
                onPress: () => shake(1.05),
                onRelease: () => shake(1),
            });
        }
    }, [isDesktop, profilePicRef]);

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
            <TextWrapper>
                <Quote>Sucking at something is the first step to be sorta good at something.</Quote>
                {!!isDesktop && (
                    <>
                        <p>
                            \\frontend_developer <br />
                            react. nextjs. vue. javascript. git. sass. styled_components. agile.
                        </p>
                        <p>
                            \\2DArtist <br /> Photoshop. digital_painting. concept_art. vector_art.
                            pixel_art. Unity.
                        </p>
                        <p>
                            \\graphic_designer <br /> Adobe. Illustrator. brand_identity. UI. logo.
                            poster.
                        </p>
                    </>
                )}
                <ProfilePicContainer ref={profilePicRef} onMouseDown={(e) => handleClick(e)}>
                    <Image
                        src="/img/me2.jpg"
                        alt="profile pic"
                        layout="responsive"
                        width="960"
                        height="1280"
                        priority
                    />
                    <PicDesc>
                        <p style={{ fontSize: '1rem', fontWeight: '600' }}>jacopo.panzera</p>
                        <p style={{ fontSize: '0.6rem' }}>
                            frontend_developer // 2DArtist // graphic_designer
                        </p>
                    </PicDesc>
                </ProfilePicContainer>
            </TextWrapper>
        </StyledPreview>
    );
};

export default Preview;
