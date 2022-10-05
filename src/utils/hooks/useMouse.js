import { useEffect, useState } from 'react';

const useMouse = () => {
    const [mouse, setMouse] = useState({ x: null, y: null });

    useEffect(() => {
        const updateMouse = (ev) => {
            setMouse({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('mousemove', updateMouse);

        return () => {
            window.removeEventListener('mousemove', updateMouse);
        };
    }, []);

    return mouse;
};
export default useMouse;
