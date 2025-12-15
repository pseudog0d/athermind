'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Module {
    name: string;
    x: number;
    y: number;
    rotation: number;
    delay: number;
}

const modules: Module[] = [
    { name: 'Athermind IntelliDAM', x: 15, y: 20, rotation: -5, delay: 0 },
    { name: 'Athermind IntegrityModule', x: 70, y: 40, rotation: 3, delay: 0.2 },
    { name: 'Athermind AI', x: 40, y: 70, rotation: -2, delay: 0.4 }
];

export default function FloatingModules() {
    const containerRef = useRef<HTMLDivElement>(null);
    const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initial animation - fade in and scale up from 0
        moduleRefs.current.forEach((moduleEl, index) => {
            if (!moduleEl) return;

            const moduleData = modules[index];  // ✅ CHANGED: was "const module"

            // Set initial state
            gsap.set(moduleEl, {
                opacity: 0,
                scale: 0,
                rotateZ: moduleData.rotation * 2,  // ✅ CHANGED: was module.rotation
                rotateX: 0,
                rotateY: 0
            });

            // Entrance animation
            gsap.to(moduleEl, {
                opacity: 1,
                scale: 1,
                rotateZ: moduleData.rotation,  // ✅ CHANGED: was module.rotation
                duration: 1.5,
                delay: moduleData.delay,  // ✅ CHANGED: was module.delay
                ease: 'elastic.out(1, 0.8)'
            });

            // Continuous floating animation
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

            tl.to(moduleEl, {
                y: `${Math.random() * 30 - 15}px`,
                x: `${Math.random() * 30 - 15}px`,
                rotateZ: moduleData.rotation + (Math.random() * 10 - 5),  // ✅ CHANGED
                duration: 3 + Math.random() * 2,
                ease: 'sine.inOut',
                delay: moduleData.delay  // ✅ CHANGED
            });

            // 3D rotation on hover
            moduleEl.addEventListener('mouseenter', () => {
                gsap.to(moduleEl, {
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: -5,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            moduleEl.addEventListener('mouseleave', () => {
                gsap.to(moduleEl, {
                    scale: 1,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            // Subtle pulsing glow effect
            gsap.to(moduleEl.querySelector('.glow'), {
                opacity: 0.6,
                scale: 1.2,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });

        // Mouse follow effect (parallax)
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            moduleRefs.current.forEach((moduleEl, index) => {
                if (!moduleEl) return;

                const speed = 0.02 + index * 0.01;
                const x = (clientX - centerX) * speed;
                const y = (clientY - centerY) * speed;

                gsap.to(moduleEl, {
                    x: `+=${x}`,
                    y: `+=${y}`,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="floating-modules fixed inset-0 z-20 pointer-events-none hidden md:block"
            style={{ perspective: '1000px' }}
        >
            {modules.map((moduleData, index) => (  // ✅ CHANGED: was "module, index"
                <div
                    key={moduleData.name}  // ✅ CHANGED: was module.name
                    ref={(el) => { moduleRefs.current[index] = el; }}
                    className="module-item absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${moduleData.x}%`,  // ✅ CHANGED: was module.x
                        top: `${moduleData.y}%`,  // ✅ CHANGED: was module.y
                        transform: 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Glow effect */}
                    <div
                        className="glow absolute inset-0 blur-[40px] opacity-30"
                        style={{
                            background: 'radial-gradient(circle, #0078B4 0%, transparent 70%)',
                            transform: 'translateZ(-10px)'
                        }}
                    />

                    {/* Main text */}
                    <div className="relative z-10 px-4 md:px-8 py-2 md:py-4 border-3 md:border-5 border-[#0078B4] backdrop-blur-sm bg-gradient-to-br from-[#0078B4]/20 to-transparent shadow-2xl">
                        <div className="text-container">
                            <h3 className="text-base md:text-2xl lg:text-3xl font-primary font-black text-white whitespace-nowrap tracking-tight uppercase">
                                {moduleData.name.split(' ').map((word, i) => (  // ✅ CHANGED: was module.name
                                    <span
                                        key={i}
                                        className="inline-block mr-1 md:mr-2"
                                        style={{
                                            animation: `shimmer 3s ease-in-out infinite ${i * 0.3}s`,
                                            backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #0078B4 50%, #ffffff 100%)',
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </h3>

                            {/* Accent line */}
                            <div
                                className="h-[2px] md:h-[3px] mt-1 md:mt-2 bg-[#0078B4]"
                                style={{
                                    animation: 'expand 2s ease-in-out infinite'
                                }}
                            />
                        </div>
                    </div>

                    {/* Particles effect */}
                    <div className="particles absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="particle absolute w-1 md:w-2 h-1 md:h-2 bg-[#0078B4]"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random()}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <style jsx>{`
                @keyframes shimmer {
                    0%, 100% {
                        background-position: 0% center;
                    }
                    50% {
                        background-position: 200% center;
                    }
                }

                @keyframes expand {
                    0%, 100% {
                        width: 30%;
                        opacity: 0.5;
                    }
                    50% {
                        width: 100%;
                        opacity: 1;
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.6;
                    }
                }

                .module-item {
                    transition: filter 0.3s ease;
                }

                .module-item:hover {
                    filter: drop-shadow(0 0 20px rgba(0, 120, 180, 0.6));
                }
            `}</style>
        </div>
    );
}
