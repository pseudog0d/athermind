'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const riskLevels = [
    { level: 'Critical', count: 3, color: '#EF4444', delay: 0 },
    { level: 'High', count: 7, color: '#F97316', delay: 0.1 },
    { level: 'Medium', count: 12, color: '#F59E0B', delay: 0.2 },
    { level: 'Low', count: 23, color: '#10B981', delay: 0.3 }
];

export default function RiskDetection() {
    const sectionRef = useRef<HTMLElement>(null);
    const radarRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current || !radarRef.current) return;

        // Radar animation
        gsap.fromTo(radarRef.current,
            { scale: 0, rotation: 0, opacity: 0 },
            {
                scale: 1,
                rotation: 360,
                opacity: 1,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: radarRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Risk cards animation
        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(card,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: index * 0.15
                }
            );
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full py-32 px-6 md:px-12 overflow-hidden"
        >
            {/* Radial gradient background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#0078B4]/20 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-6xl md:text-8xl font-primary font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                        Risk Detection
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-secondary max-w-4xl mx-auto">
                        AI-powered threat identification and risk hotspot mapping in real-time
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Radar Visualization */}
                    <div className="relative">
                        <div
                            ref={radarRef}
                            className="relative w-full aspect-square max-w-lg mx-auto"
                        >
                            {/* Radar circles */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="absolute inset-0 rounded-full border border-[#0078B4]/30"
                                    style={{
                                        margin: `${i * 10}%`,
                                        animation: `pulse ${3 + i}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.3}s`
                                    }}
                                />
                            ))}

                            {/* Scanning line */}
                            <div
                                className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
                                style={{
                                    background: 'linear-gradient(90deg, #0078B4, transparent)',
                                    animation: 'scan 4s linear infinite'
                                }}
                            />

                            {/* Risk points */}
                            {[
                                { x: 30, y: 20, risk: 'critical' },
                                { x: 70, y: 35, risk: 'high' },
                                { x: 45, y: 60, risk: 'critical' },
                                { x: 65, y: 75, risk: 'medium' },
                                { x: 25, y: 70, risk: 'high' },
                                { x: 80, y: 55, risk: 'low' }
                            ].map((point, i) => (
                                <div
                                    key={i}
                                    className="absolute w-4 h-4 rounded-full animate-ping"
                                    style={{
                                        left: `${point.x}%`,
                                        top: `${point.y}%`,
                                        backgroundColor:
                                            point.risk === 'critical' ? '#EF4444' :
                                                point.risk === 'high' ? '#F97316' :
                                                    point.risk === 'medium' ? '#F59E0B' :
                                                        '#10B981',
                                        animationDelay: `${i * 0.5}s`
                                    }}
                                />
                            ))}

                            {/* Center icon */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
                                🎯
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-white/60 text-lg">Live Risk Mapping</p>
                        </div>
                    </div>

                    {/* Right: Risk Level Cards */}
                    <div className="space-y-4">
                        {riskLevels.map((risk, index) => (
                            <div
                                key={risk.level}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className="risk-card group relative p-6 minimal-rounded bg-gradient-to-r from-white/5 to-transparent border-3 border-white/15 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden"
                            >
                                {/* Animated background bar */}
                                <div
                                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(90deg, ${risk.color}, transparent)`,
                                        width: '100%',
                                        animation: `slideRight 2s ease-out ${risk.delay}s both`
                                    }}
                                />

                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-4 h-4 rounded-full animate-pulse"
                                            style={{ backgroundColor: risk.color }}
                                        />
                                        <div>
                                            <h3 className="text-2xl font-primary font-black text-white uppercase tracking-tight">{risk.level} Risk</h3>
                                            <p className="text-white/60 font-secondary">Active threats detected</p>
                                        </div>
                                    </div>
                                    <div
                                        className="text-5xl font-mono font-bold tabular-nums"
                                        style={{ color: risk.color }}
                                    >
                                        {risk.count}
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ animation: 'shimmer 2s infinite' }}
                                />
                            </div>
                        ))}

                        {/* Summary Card */}
                        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0078B4]/20 to-transparent border border-[#0078B4]/30 backdrop-blur-xl">
                            <h3 className="text-xl font-primary font-bold text-white mb-2">Total Risks Monitored</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-primary font-bold text-[#0078B4]">
                                    {riskLevels.reduce((sum, r) => sum + r.count, 0)}
                                </span>
                                <span className="text-white/60 font-secondary">across all categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.05);
                    }
                }

                @keyframes slideRight {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}
