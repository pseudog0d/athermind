'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reportTypes = [
    { name: 'Ad-hoc', color: '#0078B4', delay: 0 },
    { name: 'Weekly', color: '#00A8E8', delay: 0.1 },
    { name: 'Monthly', color: '#3FBFE8', delay: 0.2 },
    { name: 'Yearly', color: '#0078B4', delay: 0.3 }
];

export default function ReportingHub() {
    const sectionRef = useRef<HTMLElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const alertRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current || !visualRef.current) return;

        // Animate the central visualization
        gsap.fromTo(visualRef.current,
            { scale: 0, rotation: -180, opacity: 0 },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'elastic.out(1, 0.8)',
                scrollTrigger: {
                    trigger: visualRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate alert cards
        alertRefs.current.forEach((alert, index) => {
            if (!alert) return;

            gsap.fromTo(alert,
                { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: alert,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: index * 0.15
                }
            );
        });

        // Pulsing animation for alerts
        const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true });
        alertRefs.current.forEach((alert, index) => {
            if (!alert) return;
            pulseTimeline.to(alert, {
                scale: 1.02,
                duration: 2,
                ease: 'sine.inOut',
                delay: index * 0.5
            }, 0);
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full py-32 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-transparent to-[#0a0a0a]"
        >
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 120, 180, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 120, 180, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-6xl md:text-8xl font-primary font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                        Intelligent Reporting
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-secondary max-w-4xl mx-auto">
                        From ad-hoc insights to scheduled analytics—always one step ahead of risk
                    </p>
                </div>

                {/* Main Visual */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left: Report Types */}
                    <div className="space-y-6">
                        {reportTypes.map((report, index) => (
                            <div
                                key={report.name}
                                ref={(el) => { alertRefs.current[index] = el; }}
                                className="report-card group relative p-6 minimal-rounded bg-gradient-to-r from-white/5 to-transparent border-3 border-white/15 hover:border-[#0078B4]/80 transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${report.color}40, ${report.color}10)`,
                                            border: `2px solid ${report.color}30`
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-primary font-black text-white mb-1 uppercase tracking-tight">{report.name} Reports</h3>
                                        <p className="text-white/60 font-secondary">
                                            {report.name === 'Ad-hoc' && 'Generate insights on-demand'}
                                            {report.name === 'Weekly' && 'Automated weekly summaries'}
                                            {report.name === 'Monthly' && 'Comprehensive monthly analytics'}
                                            {report.name === 'Yearly' && 'Strategic annual assessments'}
                                        </p>
                                    </div>
                                    <div
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: report.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Visual Representation */}
                    <div
                        ref={visualRef}
                        className="relative h-[600px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 p-8 overflow-hidden"
                    >
                        {/* Animated waves */}
                        <div className="absolute inset-0">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
                                    style={{
                                        background: `linear-gradient(180deg, transparent, #0078B4)`,
                                        animation: `wave ${3 + i}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.3}s`,
                                        bottom: `${i * 15}%`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Central chart representation */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-center">
                            <div className="text-center mb-8">
                                <div className="text-7xl mb-4">📈</div>
                                <h3 className="text-3xl font-primary font-bold text-white mb-2">Real-time Analytics</h3>
                                <p className="text-white/60 font-secondary">Dashboard Preview</p>
                            </div>

                            {/* Fake data visualization */}
                            <div className="w-full max-w-sm space-y-4">
                                {[85, 92, 78, 95].map((value, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-20 text-white/60 text-sm">Q{i + 1}</div>
                                        <div className="flex-grow h-8 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#0078B4] to-[#00A8E8] rounded-full"
                                                style={{
                                                    width: `${value}%`,
                                                    animation: `fillBar 2s ease-out ${i * 0.2}s both`
                                                }}
                                            />
                                        </div>
                                        <div className="w-12 text-white font-bold">{value}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Generation Feature */}
                <div className="text-center">
                    <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border border-red-500/30 backdrop-blur-xl">
                        <h3 className="text-2xl font-primary font-bold text-white mb-2 flex items-center justify-center gap-3">
                            <span className="text-3xl animate-pulse">⚠️</span>
                            Immediate Compliance Alerts
                            <span className="text-3xl animate-pulse">⚠️</span>
                        </h3>
                        <p className="text-white/80 font-secondary">
                            Instant notifications when risks are detected—never miss a compliance deadline
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% {
                        transform: translateY(0) scaleY(1);
                        opacity: 0.1;
                    }
                    50% {
                        transform: translateY(-20px) scaleY(1.2);
                        opacity: 0.3;
                    }
                }

                @keyframes fillBar {
                    from {
                        width: 0%;
                    }
                }
            `}</style>
        </section>
    );
}
