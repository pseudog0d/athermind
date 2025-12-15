'use client';

import { useEffect, useRef } from 'react';

const solutions = [
    {
        id: '01',
        name: 'IntelliDAM',
        title: 'Athermind IntelliDAM',
        description: 'Predict and mitigate risks before they materialize. Our AI engine analyzes millions of data points to provide real-time threat assessments and actionable insights for banking infrastructure.',
    },
    {
        id: '02',
        name: 'Integrity',
        title: 'Athermind Integrity Module',
        description: 'Stay ahead of global regulations. From GDPR to Basel III, our dynamic engine ensures continuous compliance, reducing audit times by up to 60% and eliminating manual error.',
    },
    {
        id: '03',
        name: 'AI',
        title: 'Athermind AI',
        description: 'Secure your supply chain. Automatically assess and monitor third-party vendors for security postures, financial stability, and compliance adherence in real-time.',
    },
];

export default function FeaturedSolutions() {
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Use batch DOM updates
        requestAnimationFrame(() => {
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px)';
                    card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.style.willChange = 'opacity, transform';
                    observer.observe(card);
                }
            });
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="featured-solutions relative z-10 w-full bg-[#141414] text-[#f8f8f8] py-32 px-10">
            {/* Section Header */}
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-8">
                <h2 className="text-[5vw] font-primary leading-none mix-blend-difference">
                    Featured <br /> <span className="italic font-primary-italic text-white/60">Solutions</span>
                </h2>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-4 md:mb-2 opacity-60 font-secondary max-w-xs text-right">
                    Comprehensive GRC for the Modern Enterprise
                </p>
            </div>

            {/* Solutions List */}
            <div className="solutions-list flex flex-col gap-32">
                {solutions.map((solution, index) => (
                    <a
                        key={solution.id}
                        href="#"
                        ref={(el) => { cardsRef.current[index] = el; }}
                        className="solution-card group block relative border-t border-white/10 pt-10 transition-colors duration-500 hover:border-accent/40"
                    >
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
                            <div className="col-span-2 text-[11px] font-secondary uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">
                                {solution.id} / {solution.name}
                            </div>
                            <div className="col-span-7">
                                <h3 className="text-[4vw] font-primary leading-[1.1] mb-6 group-hover:text-white/80 transition-colors duration-500">
                                    {solution.title.split(' ')[0]} <br /> {solution.title.split(' ').slice(1).join(' ')}
                                </h3>
                                <div className="overflow-hidden">
                                    <p className="text-sm md:text-base font-secondary opacity-60 max-w-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-justify">
                                        {solution.description}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0078B4]/40 to-[#00486C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] uppercase tracking-widest opacity-20 group-hover:scale-110 transition-transform duration-700">
                                            View Solution
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
