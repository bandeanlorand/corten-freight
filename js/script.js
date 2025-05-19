/* script for mobile menu starts here */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const body = document.body;

    function openMenu() {
    body.classList.add('overflow-hidden');
    menuToggle.classList.add('menu-opened');

    menu.classList.remove('opacity-0', 'max-h-0', 'pointer-events-none' );
        
    requestAnimationFrame(() => {
        menu.classList.add('opacity-100', 'py-[17vh]', 'py-[17dvh]');
        setTimeout(function() {
            

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
});


/* script for mobile menu ends here */

/* script for paralax effect starts here */
document.addEventListener("DOMContentLoaded", function () {
    const parallaxSectionsTop = document.querySelectorAll('.hero-bg');
    const parallaxSections = document.querySelectorAll('.home-middle-image-section, .home-bottom-image-section');

    function getSpeed(type) {
        const width = window.innerWidth;

        if (type === 'top') {
            if (width < 768) return 0.05;       // mobile header
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



/* script for mobile starts here */
// document.addEventListener('DOMContentLoaded', () => {

//     const modal = document.getElementById('quote-modal');
//     const body = document.body;

//     document.querySelectorAll('.request-quote-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             modal.classList.remove('hidden');
//             modal.classList.add('flex');
//             body.classList.add('body-modal-open');
//         });
//     });

//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.classList.add('hidden');
//             modal.classList.remove('flex');
//             body.classList.remove('body-modal-open');
//         }
//     });

//     document.getElementById('quote-form').addEventListener('submit', (e) => {
//         e.preventDefault();
//         if (!e.target.agree.checked) {
//             alert('You must agree to the terms.');
//             return;
//         }
//         alert('Form submitted! ');
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quote-modal');
    const body = document.body;
    const form = document.getElementById('quote-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    document.querySelectorAll('.request-quote-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            body.classList.add('body-modal-open');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

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

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        body.classList.remove('body-modal-open');
    }
});


/* script for mobile ends here */

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
});


// Scroll Button at Bottom script ends here