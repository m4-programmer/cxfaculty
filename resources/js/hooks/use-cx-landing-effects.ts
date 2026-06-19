import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export function useCxLandingEffects(): void {
    const { url } = usePage();

    useEffect(() => {
        const cursor = document.getElementById('cx-cursor');
        const ring = document.getElementById('cx-cursor-ring');
        const nav = document.getElementById('cx-nav');

        let ringX = 0;
        let ringY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let frame = 0;

        const onMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (cursor) {
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
            }
        };

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            if (ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }

            frame = requestAnimationFrame(animateRing);
        };

        const onScroll = () => {
            nav?.classList.toggle('scrolled', window.scrollY > 60);
        };

        const hoverTargets = document.querySelectorAll(
            '.cx-landing a, .cx-landing button, .cx-service-card, .cx-why-card, .cx-industry-item, .cx-pillar, .cx-hero-stat, .cx-process-step, .cx-post-card',
        );

        const addHover = () => {
            cursor?.classList.add('hover');
            ring?.classList.add('hover');
        };

        const removeHover = () => {
            cursor?.classList.remove('hover');
            ring?.classList.remove('hover');
        };

        hoverTargets.forEach((element) => {
            element.addEventListener('mouseenter', addHover);
            element.addEventListener('mouseleave', removeHover);
        });

        const reveals = document.querySelectorAll('.cx-reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 },
        );

        reveals.forEach((element) => observer.observe(element));

        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll);
        frame = requestAnimationFrame(animateRing);
        onScroll();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
            hoverTargets.forEach((element) => {
                element.removeEventListener('mouseenter', addHover);
                element.removeEventListener('mouseleave', removeHover);
            });
            observer.disconnect();
        };
    }, [url]);
}
