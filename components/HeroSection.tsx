'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
    const { clipMaskRef, titleTopRef, titleBottomRef, introTextRef, heroTrackRef } = useScrollAnimation();

    return (
        <section ref={heroTrackRef} className="hero-track relative w-full h-[300vh] bg-transparent">
            {/* Sticky Container */}
            <div className="hero-sticky sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center text-[#f8f8f8]">

                {/* Hero Text Top */}
                <h1 className="hero-title relative z-10 text-center mix-blend-difference">
                    <span
                        ref={titleTopRef}
                        className="block text-[11.5vw] leading-[0.9] -tracking-[0.04em] font-primary"
                    >
                        Where trust
                    </span>
                </h1>

                {/* Hero Image Container (Hexagon) */}
                <div className="hero-image-container absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div ref={clipMaskRef} className="hero-clip-mask relative">
                        {/* Main Video */}
                        <video
                            src="/videos/fingerprint_blue.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="bg-black"
                        />
                    </div>
                </div>

                {/* Hero Text Bottom */}
                <h1 className="hero-title relative z-10 text-center mix-blend-difference self-end pr-[10vw]">
                    <span
                        ref={titleBottomRef}
                        className="block text-[11.5vw] leading-[0.9] -tracking-[0.04em] italic font-primary-italic"
                    >
                        is secured.
                    </span>
                </h1>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-10 text-[0.6rem] uppercase tracking-widest opacity-60">
                    Scroll Down
                </div>

                {/* Intro Text (Blurred) */}
                <div className="absolute bottom-10 left-10 max-w-md hidden md:block intro-text">
                    <p
                        ref={introTextRef}
                        className="text-3xl font-primary leading-tight opacity-40 blur-[4px] mix-blend-difference will-change-[filter,opacity,transform] text-white"
                    >
                        Athermind empowers BFSI leaders to navigate complexity with confidence. Governance, Risk, and
                        Compliance—simplified.
                    </p>
                </div>
            </div>
        </section>
    );
}
