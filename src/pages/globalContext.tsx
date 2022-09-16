import { createContext } from 'react';

interface IGlobalContext {
    pageIndex?: number;
    setPageIndex?: (number) => void;
    showMenu?: boolean;
    setShowMenu?: (boolean) => void;
    projectIndex?: number;
    setProjectIndex?: (number) => void;
    showProject?: boolean;
    setShowProject?: (boolean) => void;
    projects?: {
        url: string;
        name: string;
        desc?: string;
        type?: string[];
        slides?: string[];
        preview?: boolean;
        show?: boolean;
    }[];
    setProjects?: ([]) => void;
}

const GlobalContext = createContext<IGlobalContext>({});

export default GlobalContext;
