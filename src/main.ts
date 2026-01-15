import './style.css';

/* ============================================
   FLUXO CLÍNICAS - TypeScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav__link, .nav__mobile-actions .btn');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        if (header) {
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const target = document.querySelector<HTMLElement>(href);
                if (target && header) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animatableElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .pricing-card, .ai-card, .dictation-card, .code-block'
    );

    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;

            if (submitBtn) {
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = `
                    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    Enviando...
                `;
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(function () {
                    submitBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Mensagem Enviada!
                    `;
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

                    setTimeout(function () {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }



    // Counter animation for stats
    function animateCounter(element: Element, target: number, duration: number = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString('pt-BR');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('pt-BR');
            }
        }

        updateCounter();
    }

    // Animate counters when in view
    const statNumbers = document.querySelectorAll('.stat__number');
    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent || '';

                // Parse the number (handle formats like "2.500+" or "1M+")
                if (text.includes('M')) {
                    // Keep as is for "1M+"
                } else if (text.includes('%')) {
                    // Keep as is for percentages
                } else {
                    const num = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(num) && num > 0) {
                        animateCounter(el, num);
                        if (text.includes('+')) {
                            setTimeout(() => {
                                el.textContent = el.textContent + '+';
                            }, 2100);
                        }
                    }
                }

                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Parallax effect for glows
    window.addEventListener('mousemove', function (e) {
        const glows = document.querySelectorAll<HTMLElement>('.hero__glow');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glows.forEach((glow, index) => {
            const speed = (index + 1) * 20;
            glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    window.addEventListener('scroll', function () {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector<HTMLElement>(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll<HTMLElement>('.nav__link').forEach(link => {
                        link.style.color = '';
                    });
                    navLink.style.color = 'var(--color-accent-secondary)';
                }
            }
        });
    });

    // Phone number mask
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            const target = e.target as HTMLInputElement;
            let value = target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            }

            target.value = value;
        });
    }
});

// Console Easter Egg
console.log('%c🏥 Fluxo Clínicas', 'font-size: 24px; font-weight: bold; color: #9333ea;');
console.log('%cTecnologia que humaniza a saúde.', 'font-size: 14px; color: #a1a1aa;');
console.log('%cInteressado em trabalhar conosco? contato@fluxoclinicas.online', 'font-size: 12px; color: #71717a;');
