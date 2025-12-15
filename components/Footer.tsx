'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const footerLinks = {
    product: ['IntelliDAM', 'IntegrityModule', 'Athermind AI', 'Pricing'],
    company: ['About', 'Blog', 'Careers', 'Press'],
    resources: ['Documentation', 'Support', 'API Reference', 'Community'],
    legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance']
};

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!footerRef.current || !ctaRef.current) return;

        // CTA hover effect
        const ctaButton = ctaRef.current.querySelector('button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                gsap.to(ctaButton, {
                    scale: 1.05,
                    boxShadow: '0 20px 60px rgba(0, 120, 180, 0.4)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            ctaButton.addEventListener('mouseleave', () => {
                gsap.to(ctaButton, {
                    scale: 1,
                    boxShadow: '0 10px 30px rgba(0, 120, 180, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-gradient-to-b from-[#0a0a0a] to-black border-t border-white/10 overflow-hidden"
        >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0078B4] to-transparent" />

            {/* Main CTA Section */}
            <div ref={ctaRef} className="relative py-24 px-6 md:px-12">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-primary font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                        Ready to Transform
                        <br />
                        <span className="bg-gradient-to-r from-[#0078B4] via-[#00A8E8] to-[#3FBFE8] bg-clip-text text-transparent">
                            Your Compliance?
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-secondary">
                        Join leading BFSI organizations leveraging Athermind to navigate complexity with confidence
                    </p>
                    <button className="group px-12 py-5 minimal-rounded bg-gradient-to-r from-[#0078B4] to-[#00A8E8] text-white text-lg font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl relative overflow-hidden border-3 border-[#00A8E8]">
                        <span className="relative z-10">Schedule a Demo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E8] to-[#3FBFE8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>

            {/* Links Section */}
            <div className="border-t border-white/10 py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                        {/* Logo Column */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="text-4xl font-primary font-bold text-white mb-4">
                                Athermind
                            </div>
                            <p className="text-white/60 text-sm mb-6 font-secondary">
                                Empowering BFSI leaders with intelligent GRC solutions
                            </p>
                            <div className="flex gap-4">
                                {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0078B4] border border-white/10 hover:border-[#0078B4] flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                                    >
                                        {social[0]}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="text-white font-primary font-black uppercase tracking-wider text-sm mb-4">
                                    {category}
                                </h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-white/60 hover:text-[#0078B4] transition-colors duration-300 text-sm font-secondary"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white/40 text-sm font-secondary">
                        © 2025 Athermind. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white/40 font-secondary">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            All systems operational
                        </span>
                        <span>•</span>
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                        <span>•</span>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
