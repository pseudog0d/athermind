'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Header() {
    const logoRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set initial states
        if (logoRef.current) {
            gsap.set(logoRef.current, {
                scale: 0,
                opacity: 0,
                letterSpacing: '-0.1em'
            });
        }

        navItemsRef.current.forEach((item) => {
            if (item) {
                gsap.set(item, {
                    y: -50,
                    opacity: 0
                });
            }
        });

        if (ctaRef.current) {
            gsap.set(ctaRef.current, {
                y: -50,
                opacity: 0
            });
        }

        // Create timeline for entrance animations
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Logo animation - settles then expands
        tl.to(logoRef.current, {
            scale: 0.85,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)'
        })
            .to(logoRef.current, {
                scale: 1,
                letterSpacing: '-0.04em',
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.2');

        // Nav items float in sequentially
        navItemsRef.current.forEach((item, index) => {
            if (item) {
                tl.to(item, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'back.out(1.5)'
                }, `-=${0.5 - index * 0.08}`);
            }
        });

        // CTA floats in
        tl.to(ctaRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.5)'
        }, '-=0.4');

        // Hover effects for nav items
        navItemsRef.current.forEach((item) => {
            if (!item) return;

            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -3,
                    color: '#0078B4',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    color: 'rgba(248, 248, 248, 0.9)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // CTA hover effect
        if (ctaRef.current) {
            const ctaElement = ctaRef.current.querySelector('a');
            if (ctaElement) {
                ctaElement.addEventListener('mouseenter', () => {
                    gsap.to(ctaElement, {
                        scale: 1.05,
                        backgroundColor: '#0078B4',
                        borderColor: '#0078B4',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                ctaElement.addEventListener('mouseleave', () => {
                    gsap.to(ctaElement, {
                        scale: 1,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        }

    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6 text-white border-b-5 border-white/30 bg-background/80 backdrop-blur-sm">
            {/* Logo */}
            <div
                ref={logoRef}
                className="logo font-primary font-bold text-xl tracking-tighter leading-none text-white uppercase"
                style={{ fontSize: '3.5rem', willChange: 'transform, opacity' }}
            >
                Athermind
            </div>

            <div className="flex items-center gap-12">
                {/* Navigation */}
                <nav className="hidden md:flex gap-10 text-sm uppercase tracking-[0.2em] font-primary font-bold text-white">
                    <a
                        ref={(el) => { navItemsRef.current[0] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        Work
                    </a>
                    <a
                        ref={(el) => { navItemsRef.current[1] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        Pricing
                    </a>
                    <a
                        ref={(el) => { navItemsRef.current[2] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        Blog
                    </a>
                    <a
                        ref={(el) => { navItemsRef.current[3] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        About
                    </a>
                    <a
                        ref={(el) => { navItemsRef.current[4] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        Career
                    </a>
                    <a
                        ref={(el) => { navItemsRef.current[5] = el; }}
                        href="#"
                        className="transition-colors duration-300 border-b-3 border-transparent hover:border-[#0078B4]"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        Contact
                    </a>
                </nav>

                {/* CTA */}
                <div ref={ctaRef} className="cta hidden md:block" style={{ willChange: 'transform, opacity' }}>
                    <a
                        href="#"
                        className="border-3 border-white px-8 py-2 text-sm uppercase tracking-[0.2em] font-primary font-bold hover:bg-[#0078B4] hover:border-[#0078B4] hover:text-white transition-all duration-300"
                    >
                        Book a Call
                    </a>
                </div>

                {/* Mobile Menu Trigger */}
                <div className="menu-trigger md:hidden">
                    <div className="w-8 h-0.5 bg-white mb-1.5"></div>
                    <div className="w-8 h-0.5 bg-white"></div>
                </div>
            </div>
        </header>
    );
}
