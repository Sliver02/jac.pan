import { useState, useEffect } from 'react';

const useMedia = (breakpointsRange = [], rule = 'min') => {
    const [media, setMedia] = useState(false);

    useEffect(() => {
        function handleResize() {
            let match = false;

            if (breakpointsRange.length == 1) {
                let breakpoint = breakpointsRange[0];
                if (rule == 'max') {
                    breakpoint--;
                }
                match = window.matchMedia(`(${rule}-width: ${breakpoint}px)`).matches;
            } else if (breakpointsRange.length == 2) {
                match = window.matchMedia(
                    `(min-width: ${breakpointsRange[0]}px) and (max-width: ${breakpointsRange[1]}px)`
                ).matches;
            }
            setMedia(match);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return media;
};
export default useMedia;
