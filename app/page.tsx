'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FloatingModules from '@/components/FloatingModules';
import ModulesShowcase from '@/components/ModulesShowcase';
import ReportingHub from '@/components/ReportingHub';
import RiskDetection from '@/components/RiskDetection';
import DashboardPreview from '@/components/DashboardPreview';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Home() {
    // Initialize smooth scrolling
    useSmoothScroll();

    return (
        <>
            <Header />

            {/* Ambient Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    src="/videos/fingerprint_blue.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-60 blur-[100px] scale-125"
                    style={{ willChange: 'transform' }}
                />
            </div>

            {/* Floating Modules */}
            <FloatingModules />

            {/* Main Content */}
            <main className="relative z-10">
                <HeroSection />
                <ModulesShowcase />
                <ReportingHub />
                <RiskDetection />
                <DashboardPreview />
            </main>

            <Footer />
        </>
    );
}
