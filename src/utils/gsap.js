// SSR doesn't work with ES Modules so we need to import the UMD files instead
import 'gsap';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

// configure/register once we're running in the browser
if (typeof window !== 'undefined') {
    gsap.config({
        nullTargetWarn: false,
        force3D: false,
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.core.globals('ScrollTrigger', ScrollTrigger);
}

// export anything that you might need a reference to
export * from 'gsap/dist/gsap';
export * from 'gsap/dist/ScrollTrigger';
export * from 'gsap/dist/ScrollToPlugin';
