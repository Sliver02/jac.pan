import Navbar from '@components/navbar';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import GlobalContext from '@utils/globalContext';
import styled, { css } from 'styled-components';
import { gsap, ScrollTrigger } from '@utils/gsap.js';
import useViewport from '@utils/hooks/useViewport';
import useMedia from '@utils/hooks/useMedia';
import Dots from '@components/dots';
import { createRefs } from '@utils/utility';
import { breakpoints } from '@styles/variables';
import media from '@styles/mediaQueries';
import MouseFollow from '@components/mouseFollow';
import Particles from '@components/particles';

const Panel = styled.div`
    width: 100%;
    min-height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.5em;
    text-align: center;
    color: white;
    position: relative;
    box-sizing: border-box;
    padding: 10px;

    background: ${(props) => props.background};
    border-bottom: 1px solid white;
    border-right: none;

    ${media.min.md`
        min-height: ${(props) => !!props.height && props.height};
        border-right: 1px solid white;
        border-bottom: none;
    `}
`;

const PanelsContainer = styled.div`
    height: 100vh;
    ${media.min.md`
        width: ${(props) => props.panels * 100}%;
        display: flex;
        flex-wrap: nowrap;
    `}
`;

const Home = () => {
    let [panelIndex, setPanelIndex] = useState(0);
    let [projectIndex, setProjectIndex] = useState(0);

    let [showMenu, setShowMenu] = useState(false);
    let [showProject, setShowProject] = useState(false);
    let [scrollTimeline, setScrollTimeline] = useState(null);

    let [pages, setPages] = useState(['home', 'works', 'about', 'contact']);
    let [labels, setlabels] = useState(['home', 'works', 'works2', 'about', 'contact']);

    const panelsRef = useRef([]);
    const panelsContainerRef = useRef(null);

    const { width, height } = useViewport();
    const isDesktop = useMedia([breakpoints.md]);

    const horizontalScroll = (container, panels) => {
        const workPanelHeight = panelsRef.current[1].offsetHeight;

        scrollTimeline = gsap.timeline({
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 1,
                start: 'center center',
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => '+=' + panels.current[panels.current.length - 1].offsetLeft,
            },
        });

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 1,
            }),
            labels[0]
        );

        scrollTimeline.add(
            gsap.to(panels.current[1], {
                y: -workPanelHeight + height,
            }),
            labels[1]
        );

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 2,
            }),
            labels[2]
        );

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 3,
            }),
            labels[3]
        );

        scrollTimeline.add(labels[4]);

        setScrollTimeline(scrollTimeline);
    };

    const panelScroll = (panel, index) => {
        let labelPos = [];

        labels.forEach((label) => labelPos.push(scrollTimeline.scrollTrigger.labelToScroll(label)));

        ScrollTrigger.create({
            trigger: panel.current,
            start: labelPos[index] + ' top',
            end: labelPos[index + 1] + ' top',
            onEnter: () => setPanelIndex(index == 0 ? 1 : index),
            onLeaveBack: () => setPanelIndex(index == 0 ? 0 : index - 1),
        });
    };

    const panelMobileScroll = (panel, index) => {
        ScrollTrigger.create({
            trigger: panel,
            scrub: 1,
            start: 'top center',
            end: 'bottom bottom',
            // base vertical scrolling on how wide the container is so it feels more natural.
            onEnter: () => setPanelIndex(index),
            onLeaveBack: () => setPanelIndex(index == 0 ? 0 : index - 1),
        });
    };

    const switchPanel = (index) => {
        if (!!isDesktop) {
            let modifier = index == 1 ? 2 : panelIndex > index ? -0.5 : 0.5;

            gsap.to(window, {
                scrollTo: scrollTimeline.scrollTrigger.labelToScroll(pages[index]) + modifier,
            });
        } else {
            setShowMenu(false);

            gsap.to(window, {
                scrollTo: '#' + pages[index],
            });
        }
    };

    useEffect(() => {
        if (!!showMenu || !!showProject) {
            document.querySelector('html').style.overflowY = 'hidden';
        } else {
            document.querySelector('html').style.overflowY = 'auto';
        }
    }, [showMenu, showProject]);

    useEffect(() => {
        if (!panelsContainerRef || !panelsRef || isDesktop == null) {
            return;
        }

        if (!isDesktop) {
            panelsRef.current.forEach((panel, index) => panelMobileScroll(panel, index));
        } else {
            setShowMenu(false);

            horizontalScroll(panelsContainerRef, panelsRef);

            panelsRef.current.forEach((panel, index) => panelScroll(panel, index));

            return () => {
                scrollTimeline.scrollTrigger.disable();
                scrollTimeline.kill();
            };
        }
    }, [isDesktop, width, height]);

    return (
        <GlobalContext.Provider
            value={{
                panelIndex,
                setPanelIndex,
                showMenu,
                setShowMenu,
                projectIndex,
                setProjectIndex,
                showProject,
                setShowProject,
                pages,
                setPages,
            }}
        >
            <Head>
                <title>Jacopo Panzera</title>
                <meta
                    name="description"
                    content="Jacopo Panzera Portfolio | web developer - graphic desinger - illustrator"
                />

                <meta content="Jacopo Panzera" property="og:title" />
                <meta
                    content="Jacopo Panzera Portfolio | web developer - graphic desinger - illustrator"
                    property="og:description"
                />
                <meta content="https://image" property="og:image" />

                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple icon" href="/favicon.ico" />
            </Head>

            <main>
                <Navbar on_click={switchPanel} />

                <Dots />

                {!!isDesktop && <MouseFollow />}

                {!!isDesktop && <Particles />}

                <PanelsContainer ref={panelsContainerRef} panels={4}>
                    <Panel id={pages[0]} ref={(e) => createRefs(panelsRef, e, 0)} />
                    <Panel id={pages[1]} height="300%" ref={(e) => createRefs(panelsRef, e, 1)}>
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                    </Panel>
                    <Panel id={pages[2]} ref={(e) => createRefs(panelsRef, e, 2)} />
                    <Panel id={pages[3]} ref={(e) => createRefs(panelsRef, e, 3)} />
                </PanelsContainer>
            </main>

            <footer></footer>
        </GlobalContext.Provider>
    );
};

export default Home;
