import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

export const VideoScrubber = ({ src }: { src: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Apply spring physics to smooth out the scroll input
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 50,
        stiffness: 200,
        mass: 0.5,
        restDelta: 0.0001
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // iOS Safari Deep Hack: Force decoder initialization
        // iOS WebKit will literally refuse to paint new frames via `currentTime` tracking unless 
        // it believes the video has legitimately started "playing" at least once.
        const initIOS = () => {
            const p = video.play();
            if (p !== undefined) {
                p.then(() => {
                    video.pause();
                }).catch(() => { });
            }
        };

        // Attempt automatic unlock
        initIOS();
        // Safety net: If iOS Low Power Mode blocks auto-play, trigger the unlock on the very first screen touch!
        window.addEventListener('touchstart', initIOS, { once: true });

        video.playbackRate = 1;

        let debounceFrame: number;

        const handleScrub = (latest: number) => {
            if (!video.duration || Number.isNaN(video.duration)) return;
            if (debounceFrame) cancelAnimationFrame(debounceFrame);
            debounceFrame = requestAnimationFrame(() => {
                video.currentTime = latest * video.duration;
            });
        };

        const unsub = smoothProgress.onChange(handleScrub);

        const onLoadedMetadata = () => {
            handleScrub(smoothProgress.get());
        };
        video.addEventListener('loadedmetadata', onLoadedMetadata);

        return () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            window.removeEventListener('touchstart', initIOS);
            unsub();
            if (debounceFrame) cancelAnimationFrame(debounceFrame);
        };
    }, [smoothProgress]);

    // Subtle breathing scale on the massive video
    const videoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-zinc-50 border-y border-zinc-200 pb-[10vh]">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Unobtrusive Floating Typography - Adjusted for light mode readability */}
                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
                        y: useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30])
                    }}
                    className="absolute top-24 md:top-32 z-20 text-center px-6 w-full pointer-events-none"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-widest text-emerald-600 mb-4 mix-blend-multiply uppercase drop-shadow-sm">
                        Alpha Feed Override
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-widest uppercase max-w-2xl mx-auto font-semibold">
                        [ Intercepting Generator Deployments — Zero Latency ]
                    </p>
                </motion.div>

                {/* Massively Scaled Video Container */}
                <motion.div
                    style={{ scale: videoScale }}
                    className="relative w-[100vw] h-[60vh] md:h-auto md:w-[95vw] max-w-[2000px] md:aspect-video flex-shrink-0"
                >
                    {/* Edge fade mask for Light Mode - dissolves cleanly into pure #fafafa (zinc-50) */}
                    <div
                        className="absolute inset-0 rounded-[2rem] md:rounded-[4rem] pointer-events-none z-10 shadow-[inset_0_0_40px_10px_#fafafa] md:shadow-[inset_0_0_80px_20px_#fafafa]"
                    />

                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        autoPlay
                        preload="auto"
                        /* mix-blend-normal maps the dark parts of the video onto the white background beautifully */
                        className="w-full h-full object-cover mix-blend-normal opacity-100 rounded-[2rem] md:rounded-[4rem]"
                        style={{
                            willChange: 'transform',
                            transform: 'translateZ(0)', // Force 3D hardware acceleration for iOS
                            // Fade corners to transparent so it dissolves into the white bg
                            maskImage: 'radial-gradient(ellipse at center, black 75%, transparent 98%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 75%, transparent 98%)'
                        }}
                    >
                        <source src={src.replace('.mp4', '_scrub.mp4')} type="video/mp4" />
                    </video>
                </motion.div>

            </div>
        </div>
    );
};
