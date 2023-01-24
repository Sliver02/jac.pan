import { useEffect, useState } from 'react';

const useMouse = () => {
    const [mouse, setMouse] = useState({ x: null, y: null });

    useEffect(() => {
        const updateMouse = (ev) => {
            setMouse({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('pointermove', updateMouse);

        return () => {
            window.removeEventListener('pointermove', updateMouse);
        };
    }, []);

    return mouse;
};
export default useMouse;
