import Navbar from '@components/navbar';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import GlobalContext from './globalContext';
import styled, { css } from 'styled-components';
import { gsap, Quart } from '@utils/gsap.js';
import { useViewport } from '@utils/useViewport';

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

    const panelsRef = useRef([]);
    const panelsContainerRef = useRef(null);

    const { width, height } = useViewport();

    const labels = ['panel1', 'panel2', 'panel3', 'panel4'];

    const createPanelsRefs = (ref, panel, index) => {
        ref.current[index] = panel;
    };

    const horizontalScroll = (container, panels) => {
        if (!container || !panels) {
            return;
        }

        const totalPanels = panels.current.length;
        const panel2Height = panelsRef.current[1].offsetHeight;

        scrollTimeline = gsap.timeline({
            ease: 'none',
            scrollTrigger: {
                trigger: panelsContainerRef.current,
                pin: true,
                scrub: 1,
                markers: true,
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => '+=' + panelsRef.current[panelsRef.current.length - 1].offsetLeft,
                // snap: {
                //     snapTo: 'labelsDirectional',
                //     duration: { min: 0.2, max: 2 },
                //     delay: 0,
                //     ease: Quart.easeOut,
                // },
            },
        });

        setScrollTimeline(scrollTimeline);

        scrollTimeline.add(labels[0], '<');

        scrollTimeline.add(
            gsap.to(panelsRef.current, {
                xPercent: -100 * 1,
            })
        );

        scrollTimeline.add(labels[1], '>');

        if (panel2Height > window.innerHeight) {
            console.log('asdasd');

            scrollTimeline.add(
                gsap.to(panelsRef.current[1], {
                    y: -panel2Height + window.innerHeight,
                })
            );

            scrollTimeline.add('panel2-2', '>');
        }

        scrollTimeline.add(
            gsap.to(panelsRef.current, {
                xPercent: -100 * 2,
            })
        );

        scrollTimeline.add(labels[2], '>');

        scrollTimeline.add(
            gsap.to(panelsRef.current, {
                xPercent: -100 * 3,
            })
        );

        scrollTimeline.add(labels[3], '>');
    };

    useEffect(() => {
        horizontalScroll(panelsContainerRef, panelsRef);

        return () => {
            scrollTimeline.scrollTrigger.disable();
            scrollTimeline.kill();
        };
    }, [width, height]);

    const switchPanel = (index) => {
        let offsets = [];

        panelsRef.current.map((panel) => {
            offsets.push(panel.offsetLeft);
        });

        // gsap.to(window, {
        //     duration: 1,
        //     scrollTo: offsets[index],
        // });

        scrollTimeline.tweenTo(labels[index]);
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
                <PanelsContainer ref={panelsContainerRef} panels={4}>
                    <Panel background="#4ee" ref={(e) => createPanelsRefs(panelsRef, e, 0)} />
                    <Panel
                        background="#ee9f44"
                        height="300%"
                        ref={(e) => createPanelsRefs(panelsRef, e, 1)}
                    >
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                        cazzo schifo{<br />}
                    </Panel>
                    <Panel background="#5544ee" ref={(e) => createPanelsRefs(panelsRef, e, 2)} />
                    <Panel background="#ee4444" ref={(e) => createPanelsRefs(panelsRef, e, 3)} />
                </PanelsContainer>
            </main>

            <footer></footer>
        </GlobalContext.Provider>
    );
};

export default Home;
