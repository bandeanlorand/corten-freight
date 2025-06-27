document.addEventListener("DOMContentLoaded", function () {
    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const body = document.body;

    function openMenu() {
        body.classList.add('overflow-hidden');
        menuToggle.classList.add('menu-opened');
        menu.classList.remove('opacity-0', 'max-h-0', 'pointer-events-none');

        requestAnimationFrame(() => {
            menu.classList.add('opacity-100', 'py-[17vh]', 'py-[17dvh]');
            setTimeout(() => {
                menu.classList.add('overflow-y-auto');
            }, 200);
        });
    }

    function closeMenu() {
        body.classList.remove('overflow-hidden');
        menuToggle.classList.remove('menu-opened');
        menu.classList.remove('opacity-100', 'py-[17vh]', 'py-[17dvh]');
        menu.classList.add('opacity-0', 'max-h-0');
        menu.classList.remove('overflow-y-auto');
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.contains('menu-opened') ? closeMenu() : openMenu();
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menuToggle.classList.contains('menu-opened')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
                menu.classList.remove('pointer-events-none');
                menu.style.maxHeight = '';
            }
        });
    }

    // --- PARALLAX EFFECT ---
    const parallaxSectionsTop = document.querySelectorAll('.hero-bg');
    const parallaxSections = document.querySelectorAll('.home-middle-image-section, .home-bottom-image-section, .our-services-bottom-image-section');

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    if (isIOS) {
        [...parallaxSectionsTop, ...parallaxSections].forEach(section => {
            section.classList.add('disable-parallax');
        });
    } else {
        function getSpeed(type) {
            const width = window.innerWidth;
            return type === 'top'
                ? width < 768 ? 0.012 : width < 1024 ? 0.1 : 0.15
                : width < 768 ? 0.08 : width < 1024 ? 0.5 : 0.7;
        }

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const speedTop = getSpeed('top');
            parallaxSectionsTop.forEach(section => {
                const offset = section.offsetTop;
                section.style.backgroundPosition = `center ${ (scrollTop - offset) * speedTop }px`;
            });

            const speedMiddle = getSpeed('middle');
            parallaxSections.forEach(section => {
                const offset = section.offsetTop;
                section.style.backgroundPosition = `center ${ (scrollTop - offset) * speedMiddle }px`;
            });
        });
    }

    // --- MODAL LOGIC ---
    const modal = document.getElementById('quote-modal');
    const modalBox = document.getElementById('quote-box');
    const form = document.getElementById('quote-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const openBtns = document.querySelectorAll('.request-quote-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.remove('hidden', 'overlay-hidden'); // Remove overlay-hidden
        modal.classList.add('flex', 'overlay-visible');
        modalBox.classList.remove('modal-hidden');
        modalBox.classList.add('modal-visible');
        body.classList.add('body-modal-open');
    });
});


    function closeModal() {
        modalBox.classList.remove('modal-visible');
        modalBox.classList.add('modal-hidden');
        modal.classList.remove('overlay-visible');
        modal.classList.add('overlay-hidden');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            body.classList.remove('body-modal-open');
        }, 250);
    }

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    closeBtn?.addEventListener('click', closeModal);

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.agree.checked) return alert('You must agree to the terms.');

        const formData = new FormData(form);
        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                form.classList.add('hidden');
                thankYouMessage.classList.remove('hidden');
                setTimeout(() => {
                    closeModal();
                    form.reset();
                    form.classList.remove('hidden');
                    thankYouMessage.classList.add('hidden');
                }, 5000);
            } else {
                alert("There was an error submitting the form.");
                console.error(await res.text());
            }
        } catch (error) {
            alert("An unexpected error occurred.");
            console.error(error);
        }
    });

    // --- CONTACT FORM (OUTSIDE MODAL) ---
    const contactForm = document.getElementById('contact-form');
    const thankYouContact = document.getElementById('thank-you-contact');

    if (contactForm && thankYouContact) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const res = await fetch('https://formsubmit.co/ajax/ian@cortenfreight.com', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    contactForm.reset();
                    contactForm.classList.add('hidden');
                    thankYouContact.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Submission failed:', error);
            }
        });
    }

    // --- PAGE LOADER ---
    document.querySelectorAll('a[href]').forEach(link => {
        const loader = document.getElementById('page-loader');
        link.addEventListener('click', function (e) {
            const url = this.getAttribute('href');
            if (!url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                e.preventDefault();
                loader.style.display = 'flex';
                loader.classList.remove('opacity-0');
                setTimeout(() => window.location.href = url, 200);
            }
        });
    });

    // --- SCROLL TO SECTION BUTTON ---
    const scrollBtn = document.getElementById('scroll-btn');
    const targetSection = document.getElementById('services');

    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const headerOffset = window.innerWidth >= 768 ? 80 : 60;
            const targetY = targetSection.offsetTop - headerOffset;
            smoothScrollTo(targetY, 1200);
        });
    }

    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) requestAnimationFrame(scrollStep);
        }

        requestAnimationFrame(scrollStep);
    }
});
