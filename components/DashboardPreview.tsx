'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: '99.9%', label: 'Uptime Reliability', icon: '⚡' },
    { value: '45ms', label: 'Avg. Response Time', icon: '⚡' },
    { value: '24/7', label: 'Continuous Monitoring', icon: '👁️' },
    { value: '50+', label: 'Compliance Frameworks', icon: '📋' }
];

export default function DashboardPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const statRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current || !mockupRef.current) return;

        // Mockup animation
        gsap.fromTo(mockupRef.current,
            { y: 100, opacity: 0, rotateX: 45 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: mockupRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Stats animation
        statRefs.current.forEach((stat, index) => {
            if (!stat) return;

            gsap.fromTo(stat,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: index * 0.1
                }
            );
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full py-32 px-6 md:px-12 overflow-hidden"
            style={{ perspective: '2000px' }}
        >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 120, 180, 0.5) 2px, transparent 2px),
                        linear-gradient(90deg, rgba(0, 120, 180, 0.5) 2px, transparent 2px)
                    `,
                    backgroundSize: '100px 100px',
                    animation: 'gridMove 20s linear infinite'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#0078B4]/20 to-transparent border border-[#0078B4]/30">
                        <span className="text-[#0078B4] font-secondary font-medium">Coming Soon</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-primary font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                        Unified Dashboard
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-secondary max-w-4xl mx-auto">
                        All your compliance data, risk insights, and reports in one intelligent interface
                    </p>
                </div>

                {/* Dashboard Mockup */}
                <div
                    ref={mockupRef}
                    className="relative mb-20"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#0078B4]/30 via-[#00A8E8]/30 to-[#0078B4]/30 rounded-3xl blur-3xl opacity-50" />

                    {/* Main mockup */}
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl minimal-rounded border-5 border-white/30 p-8 overflow-hidden">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="ml-4 flex-grow h-8 bg-white/5 rounded-lg flex items-center px-4">
                                <span className="text-white/40 text-sm">athermind.ai/dashboard</span>
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Widget 1 */}
                            <div className="bg-gradient-to-br from-[#0078B4]/20 to-transparent rounded-xl p-6 border border-[#0078B4]/30">
                                <div className="text-4xl mb-2">📊</div>
                                <div className="text-3xl font-mono font-bold text-white mb-1">127</div>
                                <div className="text-white/60 text-sm font-secondary">Active Audits</div>
                                <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#0078B4] rounded-full" style={{ width: '73%', animation: 'fillBar 2s ease-out' }} />
                                </div>
                            </div>

                            {/* Widget 2 */}
                            <div className="bg-gradient-to-br from-[#00A8E8]/20 to-transparent rounded-xl p-6 border border-[#00A8E8]/30">
                                <div className="text-4xl mb-2">✅</div>
                                <div className="text-3xl font-mono font-bold text-white mb-1">94.2%</div>
                                <div className="text-white/60 text-sm font-secondary">Compliance Score</div>
                                <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00A8E8] rounded-full" style={{ width: '94%', animation: 'fillBar 2.2s ease-out' }} />
                                </div>
                            </div>

                            {/* Widget 3 */}
                            <div className="bg-gradient-to-br from-[#3FBFE8]/20 to-transparent rounded-xl p-6 border border-[#3FBFE8]/30">
                                <div className="text-4xl mb-2">⚠️</div>
                                <div className="text-3xl font-mono font-bold text-white mb-1">12</div>
                                <div className="text-white/60 text-sm font-secondary">Pending Alerts</div>
                                <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#3FBFE8] rounded-full" style={{ width: '28%', animation: 'fillBar 1.8s ease-out' }} />
                                </div>
                            </div>
                        </div>

                        {/* Chart placeholder */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-primary font-bold text-lg">Compliance Trend</h3>
                                <div className="flex gap-2">
                                    <div className="w-16 h-8 bg-white/5 rounded" />
                                    <div className="w-16 h-8 bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="h-48 relative">
                                {/* Simple line chart representation */}
                                <svg className="w-full h-full" viewBox="0 0 600 200">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#0078B4" />
                                            <stop offset="50%" stopColor="#00A8E8" />
                                            <stop offset="100%" stopColor="#3FBFE8" />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        points="0,150 100,120 200,100 300,80 400,70 500,60 600,50"
                                        fill="none"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 1000,
                                            strokeDashoffset: 1000,
                                            animation: 'drawLine 3s ease-out forwards'
                                        }}
                                    />
                                    {[0, 100, 200, 300, 400, 500, 600].map((x, i) => (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={150 - i * 15}
                                            r="6"
                                            fill="#0078B4"
                                            opacity="0"
                                            style={{
                                                animation: `fadeIn 0.5s ease-out ${i * 0.3 + 2}s forwards`
                                            }}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            ref={(el) => { statRefs.current[index] = el; }}
                            className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#0078B4]/50 transition-all duration-500 group cursor-pointer"
                        >
                            <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-primary font-bold text-white mb-2 bg-gradient-to-r from-white via-[#0078B4] to-white bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-white/60 font-secondary">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100px); }
                }

                @keyframes fillBar {
                    from { width: 0%; }
                }

                @keyframes drawLine {
                    to { strokeDashoffset: 0; }
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
}
