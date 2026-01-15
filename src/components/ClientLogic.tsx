"use client";

import { useEffect } from "react";

export default function ClientLogic() {
    useEffect(() => {
        // Mobile Navigation Toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;

        if (navToggle && navMenu) {
            const handleToggle = () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                body.classList.toggle('menu-open');
            };

            navToggle.addEventListener('click', handleToggle);

            const navLinks = navMenu.querySelectorAll('.nav__link, .nav__mobile-actions .btn');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });

            const handleResize = () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            };
            window.addEventListener('resize', handleResize);

            return () => {
                navToggle.removeEventListener('click', handleToggle);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        // Header scroll effect
        const header = document.getElementById('header');
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (header) {
                if (currentScroll > 50) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    header.style.boxShadow = 'none';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Scroll reveal animation with enhanced configuration
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const animatableElements = document.querySelectorAll(
            '.feature-card, .benefit-card, .pricing-card, .ai-card, .dictation-card, .code-block'
        );

        animatableElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Add slide animations to AI features
        const aiFeatures = document.querySelectorAll('.ai-feature__content');
        aiFeatures.forEach((el, index) => {
            if (index % 2 === 0) {
                el.classList.add('slide-left');
            } else {
                el.classList.add('slide-right');
            }
            observer.observe(el);
        });

        // Add scale animations to AI visuals
        const aiVisuals = document.querySelectorAll('.ai-feature__visual');
        aiVisuals.forEach(el => {
            el.classList.add('scale-in');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Counter animation
        const animateCounter = (element: Element, target: number, duration: number = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            const updateCounter = () => {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString('pt-BR');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString('pt-BR');
                }
            };
            updateCounter();
        };

        const statNumbers = document.querySelectorAll('.stat__number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent || '';
                    if (!text.includes('M') && !text.includes('%')) {
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
        return () => statsObserver.disconnect();
    }, []);

    useEffect(() => {
        // Enhanced parallax with mouse and scroll
        const glows = document.querySelectorAll<HTMLElement>('.hero__glow');

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            glows.forEach((glow, index) => {
                const speed = (index + 1) * 15;
                const rotateSpeed = (index + 1) * 5;
                glow.style.transform = `
                    translate(${x * speed}px, ${y * speed}px) 
                    rotate(${x * rotateSpeed}deg)
                `;
            });
        };

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;

            glows.forEach((glow, index) => {
                const speed = (index + 1) * parallaxSpeed;
                const currentTransform = glow.style.transform || '';

                // Update only the translateY for scroll, preserve mouse transform
                if (currentTransform.includes('translate')) {
                    glow.style.transform = currentTransform.replace(
                        /translate\([^)]+\)/,
                        (match) => {
                            const [x, y] = match.match(/-?\d+\.?\d*/g) || ['0', '0'];
                            return `translate(${x}px, ${parseFloat(y) + scrolled * speed}px)`;
                        }
                    );
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Phone mask
        const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
        if (phoneInput) {
            const handleInput = (e: Event) => {
                const target = e.target as HTMLInputElement;
                let value = target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                if (value.length > 0) {
                    if (value.length <= 2) value = `(${value}`;
                    else if (value.length <= 7) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                    else value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
                target.value = value;
            };
            phoneInput.addEventListener('input', handleInput);
            return () => phoneInput.removeEventListener('input', handleInput);
        }
    }, []);

    return null;
}
