<script>
    (function () {
        const cursor = document.getElementById('cx-cursor');
        const ring = document.getElementById('cx-cursor-ring');
        const nav = document.getElementById('cx-nav');
        let ringX = 0;
        let ringY = 0;
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (cursor) {
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ring) {
                ring.style.left = ringX + 'px';
                ring.style.top = ringY + 'px';
            }
            requestAnimationFrame(animateRing);
        }

        animateRing();

        window.addEventListener('scroll', function () {
            if (nav) {
                nav.classList.toggle('scrolled', window.scrollY > 60);
            }
        });

        const addHover = function () {
            cursor?.classList.add('hover');
            ring?.classList.add('hover');
        };

        const removeHover = function () {
            cursor?.classList.remove('hover');
            ring?.classList.remove('hover');
        };

        document.querySelectorAll(
            '.cx-landing a, .cx-landing button, .cx-service-card, .cx-why-card, .cx-industry-item, .cx-pillar, .cx-hero-stat, .cx-process-step, .cx-post-card'
        ).forEach(function (element) {
            element.addEventListener('mouseenter', addHover);
            element.addEventListener('mouseleave', removeHover);
        });

        // threshold: 0 so tall elements (e.g. full blog articles) still reveal on mobile
        // when any pixel enters the viewport — 0.12 fails when element height >> viewport.
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

        document.querySelectorAll('.cx-reveal').forEach(function (element) {
            if (element.offsetHeight > window.innerHeight * 0.85) {
                element.classList.add('visible');
                return;
            }

            observer.observe(element);
        });

        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }
    })();
</script>
