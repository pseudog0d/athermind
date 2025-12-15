'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Module {
    id: string;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    gradient: string;
    icon: string;
}

const modules: Module[] = [
    {
        id: 'intellidam',
        name: 'IntelliDAM',
        tagline: 'Intelligent Data Governance',
        description: 'Comprehensive tool for governance, risk, and compliance management. Streamline your audit processes with intelligent automation.',
        features: [
            'Automated audit workflows',
            'Real-time compliance tracking',
            'Intelligent data classification',
            'Regulatory framework mapping'
        ],
        gradient: 'from-[#0078B4] via-[#00A8E8] to-[#0078B4]',
        icon: '📊'
    },
    {
        id: 'integrity',
        name: 'IntegrityModule',
        tagline: 'Continuous Compliance Monitoring',
        description: 'On-demand compliance verification with immediate alert generation. Stay ahead of risks with continuous monitoring.',
        features: [
            'Instant compliance alerts',
            'Risk hotspot identification',
            'Policy violation detection',
            'Automated remediation workflows'
        ],
        gradient: 'from-[#00A8E8] via-[#3FBFE8] to-[#00A8E8]',
        icon: '🛡️'
    },
    {
        id: 'ai',
        name: 'Athermind AI',
        tagline: 'AI-Powered Intelligence',
        description: 'Advanced reporting engine with ad-hoc, weekly, monthly, and yearly insights. Predictive risk analytics at your fingertips.',
        features: [
            'Ad-hoc report generation',
            'Scheduled reporting (W/M/Y)',
            'Predictive risk analytics',
            'Natural language queries'
        ],
        gradient: 'from-[#3FBFE8] via-[#0078B4] to-[#3FBFE8]',
        icon: '🤖'
    }
];

export default function ModulesShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeModule, setActiveModule] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Entrance animations
        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: -15
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: index * 0.2
                }
            );
        });

        // Auto-cycle through modules
        const interval = setInterval(() => {
            setActiveModule((prev) => (prev + 1) % modules.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full py-32 px-6 md:px-12 overflow-hidden"
            style={{ perspective: '1500px' }}
        >
            {/* Background gradient mesh */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-96 h-96 bg-[#0078B4] rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-[#00A8E8] rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#3FBFE8] rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />
            </div>

            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
                <h2 className="text-6xl md:text-8xl font-primary font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                    <span className="bg-gradient-to-r from-white via-[#0078B4] to-white bg-clip-text text-transparent animate-gradient">
                        Three Pillars
                    </span>
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-secondary max-w-3xl mx-auto">
                    of Modern Governance, Risk & Compliance
                </p>
            </div>

            {/* Modules Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {modules.map((module, index) => (
                    <div
                        key={module.id}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className="module-card group relative"
                        style={{ transformStyle: 'preserve-3d' }}
                        onMouseEnter={() => setActiveModule(index)}
                    >
                        {/* Card glow effect */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                        />

                        {/* Main card */}
                        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl minimal-rounded p-8 border-5 border-white/20 hover:border-[#0078B4]/80 transition-all duration-500 h-full min-h-[600px] flex flex-col">

                            {/* Icon */}
                            <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                {module.icon}
                            </div>

                            {/* Name */}
                            <h3 className="text-4xl font-primary font-black mb-3 text-white leading-tight uppercase tracking-tight">
                                {module.name}
                            </h3>

                            {/* Tagline */}
                            <p className={`text-base font-mono font-semibold uppercase mb-6 bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent tracking-wide`}>
                                {module.tagline}
                            </p>

                            {/* Description */}
                            <p className="text-white/70 mb-8 leading-relaxed font-secondary">
                                {module.description}
                            </p>

                            {/* Features */}
                            <div className="flex-grow">
                                <ul className="space-y-4">
                                    {module.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-white/80 font-secondary"
                                            style={{
                                                animation: activeModule === index
                                                    ? `slideInLeft 0.5s ease-out ${i * 0.1}s both`
                                                    : 'none'
                                            }}
                                        >
                                            <span className="text-[#0078B4] mt-1 transform group-hover:scale-125 transition-transform">
                                                ▸
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <button className="mt-8 w-full py-4 minimal-rounded bg-gradient-to-r from-[#0078B4]/20 to-transparent border-3 border-[#0078B4]/50 text-white font-mono font-bold uppercase tracking-wider hover:from-[#0078B4] hover:to-[#00A8E8] hover:border-[#0078B4] transition-all duration-300 transform hover:scale-105 text-sm">
                                Explore {module.name}
                            </button>

                            {/* Active indicator */}
                            {activeModule === index && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#0078B4] to-transparent rounded-full animate-pulse" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
}
