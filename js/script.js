/* script for mobile menu starts here */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const body = document.body;

    function openMenu() {
        body.classList.add('overflow-hidden');
        menuToggle.classList.add('menu-opened');

        menu.classList.remove('opacity-0', 'max-h-0', 'pointer-events-none');

        requestAnimationFrame(() => {
            menu.classList.add('opacity-100', 'py-[17vh]', 'py-[17dvh]');
            setTimeout(function () {


                // Get full height
                // const contentHeight = menu.scrollHeight;
                const windowHeight = window.innerHeight;

                // If content is smaller than screen, animate to content height
                if (contentHeight < windowHeight) {
                    // menu.style.maxHeight = contentHeight + 'px';
                } else {
                    // If taller than screen, allow scroll
                    // menu.style.maxHeight = windowHeight + 'px'; // OR leave it empty: ''
                    menu.classList.add('overflow-y-auto');
                }

            }, 200);

        });
    }


    function closeMenu() {
        body.classList.remove('overflow-hidden');
        menuToggle.classList.remove('menu-opened');

        menu.classList.remove('opacity-100', 'py-[17vh]', 'py-[17dvh]');
        menu.classList.add('opacity-0', 'max-h-0');
        // menu.style.maxHeight = '0px';
        menu.classList.remove('overflow-y-auto');
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent bubbling to document
            const isOpen = menuToggle.classList.contains('menu-opened');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = menu.contains(e.target);
            const isToggleButton = menuToggle.contains(e.target);
            if (!isClickInsideMenu && !isToggleButton && menuToggle.classList.contains('menu-opened')) {
                closeMenu();
            }
        });

        // Close on resize beyond mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
                menu.classList.remove('pointer-events-none');
                // menu.classList.remove('opacity-0', 'max-h-0', 'pointer-events-none' , 'py-[17vh]', 'py-[17dvh]');
                menu.style.maxHeight = ''; // remove inline max-height on desktop
            }
        });
    }



/* script for mobile menu ends here */

/* script for paralax effect starts here */

    const parallaxSectionsTop = document.querySelectorAll('.hero-bg');
    const parallaxSections = document.querySelectorAll('.home-middle-image-section, .home-bottom-image-section, .our-services-bottom-image-section');

    function getSpeed(type) {
        const width = window.innerWidth;

        if (type === 'top') {
            if (width < 768) return 0.012;       // mobile header
            if (width < 1024) return 0.1;        // tablet header
            return 0.15;                         // desktop header
        } else {
            if (width < 768) return 0.08;         // mobile
            if (width < 1024) return 0.5;        // tablet
            return 0.7;                          // desktop
        }
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const speedTop = getSpeed('top');
        parallaxSectionsTop.forEach(section => {
            const offset = section.offsetTop;
            const distance = scrollTop - offset;
            section.style.backgroundPosition = `center ${distance * speedTop}px`;
        });

        const speedMiddle = getSpeed('middle');
        parallaxSections.forEach(section => {
            const offset = section.offsetTop;
            const distance = scrollTop - offset;
            section.style.backgroundPosition = `center ${distance * speedMiddle}px`;
        });
    });
});
/* script for paralax effect ends here */

/* script for modal box starts here */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quote-modal');
    const modalBox = document.getElementById('quote-box');
    const body = document.body;
    const form = document.getElementById('quote-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const openBtns = document.querySelectorAll('.request-quote-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.classList.remove('overlay-hidden');
            modal.classList.add('overlay-visible');

            // Make transition actually apply even on first open
            setTimeout(() => {
                modalBox.classList.remove('modal-hidden');
                modalBox.classList.add('modal-visible');
            }, 100);

            body.classList.add('body-modal-open');
        });
    
    /* script for modal box starts here */

/* Close modal when clicking outside of it */
        const contactForm = document.getElementById('contact-form');
        const thankYouContact = document.getElementById('thank-you-contact');

        if (contactForm && thankYouContact) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // Block native redirect

                const formData = new FormData(contactForm);

                try {
                    const res = await fetch('https://formsubmit.co/ajax/ian@cortenfreight.com', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (res.ok) {
                        contactForm.reset();
                        contactForm.classList.add('hidden');
                        thankYouContact.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Form failed to submit:', error);
                }
            });
        }
    });

    // Close modal function
    function closeModal() {
        modalBox.classList.remove('modal-visible');
        modalBox.classList.add('modal-hidden');

        modal.classList.remove('overlay-visible');
        modal.classList.add('overlay-hidden');

        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            body.classList.remove('body-modal-open');
        }, 250); // faster close
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    closeBtn.addEventListener('click', closeModal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.agree.checked) {
            alert('You must agree to the terms.');
            return;
        }

        const formData = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
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
});
/* script for modal box ends here */


/* script for page loader starts here */
document.querySelectorAll('a[href]').forEach(link => {
    const loader = document.getElementById('page-loader');
    link.addEventListener('click', function (e) {
        const url = this.getAttribute('href');
        if (!url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
            e.preventDefault();
            loader.style.display = 'flex';
            loader.classList.remove('opacity-0');
            setTimeout(() => {
                window.location.href = url;
            }, 200); // small delay for effect
        }
    });
});
/* script for page loader ends here */

//  Scroll Button at Bottom script starts here
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-btn');
    const targetSection = document.getElementById('services');

    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const headerOffset = window.innerWidth >= 768 ? 80 : 60;
            const targetY = targetSection.offsetTop - headerOffset;

            smoothScrollTo(targetY, 1200); // scroll duration = 1200ms
        });
    }

    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // EaseInOutCubic
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }

/* Scroll Button at Bottom script ends here */



/* script for contact form starts here */

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
                    headers: {
                        'Accept': 'application/json'
                    }
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
});

/* script for contact form ends here */
