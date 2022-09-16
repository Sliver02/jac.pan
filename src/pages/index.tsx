import { Button } from '@assets/styles/globals';
import Navbar from '@components/navbar';
import Head from 'next/head';
import { useState } from 'react';
import GlobalContext from './globalContext';

export default function Home() {
    let [pageIndex, setPageIndex] = useState(0);
    let [showMenu, setShowMenu] = useState(false);
    let [projectIndex, setProjectIndex] = useState(0);
    let [showProject, setShowProject] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                pageIndex,
                setPageIndex,
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
                <Navbar />
            </main>

            <footer></footer>
        </GlobalContext.Provider>
    );
}
