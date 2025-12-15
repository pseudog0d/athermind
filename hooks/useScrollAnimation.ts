'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
    const heroTrackRef = useRef<HTMLElement>(null);
    const clipMaskRef = useRef<HTMLDivElement>(null);
    const titleTopRef = useRef<HTMLSpanElement>(null);
    const titleBottomRef = useRef<HTMLSpanElement>(null);
    const introTextRef = useRef<HTMLParagraphElement>(null);
    const rafRef = useRef<number | null>(null);
    const cachedMediaRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        let isScrolling = false;

        const handleScroll = () => {
            if (!isScrolling) {
                isScrolling = true;

                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                }

                rafRef.current = requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroTrack = heroTrackRef.current;
                    const clipMask = clipMaskRef.current;
                    const titleTop = titleTopRef.current;
                    const titleBottom = titleBottomRef.current;
                    const introText = introTextRef.current;

                    if (!heroTrack || !clipMask) {
                        isScrolling = false;
                        return;
                    }

                    const trackHeight = heroTrack.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const scrollableDistance = trackHeight - windowHeight;

                    const rawProgress = Math.min(Math.max(scrollY / scrollableDistance, 0), 1);
                    const progress = rawProgress;

                    // 1. Clip Path Expansion - Use transform for better performance
                    const scale = 1 + (progress * 140);
                    clipMask.style.transform = `scale(${scale})`;

                    // Counter-scale video - Cache the video element
                    if (!cachedMediaRef.current) {
                        cachedMediaRef.current = clipMask.querySelector('video');
                    }
                    const media = cachedMediaRef.current;
                    if (media) {
                        media.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
                    }

                    // 2. Text Parallax - Use transform and will-change
                    if (titleTop && titleBottom) {
                        const translateY = progress * 100;
                        const opacity = 1 - progress * 2;

                        titleTop.style.transform = `translateY(-${translateY}vh)`;
                        titleTop.style.opacity = String(opacity);

                        titleBottom.style.transform = `translateY(${translateY}vh)`;
                        titleBottom.style.opacity = String(opacity);
                    }

                    // 3. Intro Text Deblur
                    if (introText) {
                        const textProgress = Math.min(progress * 2, 1);
                        const blurAmount = Math.max(0, 4 - (textProgress * 20));
                        const opacityAmount = Math.min(1, 0.4 + (textProgress * 2));

                        introText.style.filter = `blur(${blurAmount}px)`;
                        introText.style.opacity = String(opacityAmount);
                        introText.style.transform = `translateY(${20 - (textProgress * 40)}px)`;
                    }

                    isScrolling = false;
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return {
        heroTrackRef,
        clipMaskRef,
        titleTopRef,
        titleBottomRef,
        introTextRef,
    };
}
