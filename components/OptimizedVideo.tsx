'use client';

import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    priority?: boolean;
}

export default function OptimizedVideo({
    src,
    className = '',
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    priority = false,
}: OptimizedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            if (autoPlay) {
                video.play().catch(err => console.log('Video autoplay failed:', err));
            }
        };

        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, [autoPlay]);

    return (
        <video
            ref={videoRef}
            src={src}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={priority ? 'auto' : 'metadata'}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            style={{ willChange: 'transform' }}
        />
    );
}
