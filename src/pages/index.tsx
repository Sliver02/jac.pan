import Navbar from '@components/navbar';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import GlobalContext from './globalContext';
import styled, { css } from 'styled-components';
import { gsap, Quart } from '@utils/gsap.js';
import { useViewport } from '@utils/useViewport';
import Dots from '@components/dots';
import { createPanelsRefs } from '@utils/utility';
import { useScroll } from '@utils/useScroll';

const Panel = styled.div`
    width: 100%;
    min-height: 100%;
    min-height: ${(props) => !!props.height && props.height};

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
    border-right: 1px solid white;
`;

const PanelsContainer = styled.div`
    width: ${(props) => props.panels * 100}%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
`;

const Home = () => {
    let [panelIndex, setPanelIndex] = useState(0);
    let [showMenu, setShowMenu] = useState(false);
    let [projectIndex, setProjectIndex] = useState(0);
    let [showProject, setShowProject] = useState(false);
    let [scrollTimeline, setScrollTimeline] = useState(null);
    let [pages, setPages] = useState(['home', 'works', 'about', 'contact']);

    const panelsRef = useRef([]);
    const panelsContainerRef = useRef(null);

    const { width, height } = useViewport();
    const { scrollY } = useScroll();

    const horizontalScroll = (container, panels) => {
        const workPanelHeight = panelsRef.current[1].offsetHeight;

        scrollTimeline = gsap.timeline({
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 1,
                // markers: true,
                start: 'center center',
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => '+=' + panels.current[panels.current.length - 1].offsetLeft,
            },
        });

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 1,
            }),
            pages[0]
        );

        if (workPanelHeight > height) {
            scrollTimeline.add(
                gsap.to(panels.current[1], {
                    y: -workPanelHeight + height,
                }),
                pages[1]
            );
        }

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 2,
            }),
            'label1-2'
        );

        scrollTimeline.add(
            gsap.to(panels.current, {
                xPercent: -100 * 3,
            }),
            pages[2]
        );

        scrollTimeline.add(pages[3]);

        setScrollTimeline(scrollTimeline);
    };

    const autoSwitchPanel = (panels) => {
        let labelPos = [];

        pages.forEach((page) => labelPos.push(scrollTimeline.scrollTrigger.labelToScroll(page)));

        if (labelPos[0] <= scrollY && labelPos[1] - 1 > scrollY) {
            setPanelIndex(0);
        } else if (labelPos[1] <= scrollY && labelPos[2] - 1 > scrollY) {
            setPanelIndex(1);
        } else if (labelPos[2] <= scrollY && labelPos[3] - 1 > scrollY) {
            setPanelIndex(2);
        } else if (labelPos[3] <= scrollY) {
            setPanelIndex(3);
        }
    };

    useEffect(() => {
        if (!panelsContainerRef || !panelsRef) {
            return;
        }

        horizontalScroll(panelsContainerRef, panelsRef);

        return () => {
            scrollTimeline.scrollTrigger.disable();
            scrollTimeline.kill();
        };
    }, [width, height]);

    useEffect(() => {
        if (!window || !panelsRef) {
            return;
        }

        autoSwitchPanel(panelsRef);
    }, [scrollY]);

    const switchPanel = (index) => {
        gsap.to(window, {
            scrollTo: scrollTimeline.scrollTrigger.labelToScroll(pages[index]) + 1,
        });
    };

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
                <Navbar on_click={switchPanel} panels={panelsRef} />
                <Dots />
                <PanelsContainer ref={panelsContainerRef} panels={4}>
                    <Panel ref={(e) => createPanelsRefs(panelsRef, e, 0)} />
                    <Panel height="300%" ref={(e) => createPanelsRefs(panelsRef, e, 1)}>
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                    </Panel>
                    <Panel ref={(e) => createPanelsRefs(panelsRef, e, 2)} />
                    <Panel ref={(e) => createPanelsRefs(panelsRef, e, 3)} />
                </PanelsContainer>
            </main>

            <footer></footer>
        </GlobalContext.Provider>
    );
};

export default Home;
