import React from 'react';
const useMouse = () => {
    const [mouse, setMouse] = React.useState({ x: null, y: null });

    React.useEffect(() => {
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
