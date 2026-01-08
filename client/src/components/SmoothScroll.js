"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SmoothScroll({ children }) {
    const scrollRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locomotiveInstance = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !scrollRef.current) return;

        // Dynamic import for locomotive-scroll to avoid SSR issues
        const initScroll = async () => {
            try {
                const LocomotiveScroll = (await import('locomotive-scroll')).default;

                locomotiveInstance.current = new LocomotiveScroll({
                    el: scrollRef.current,
                    smooth: true,
                    multiplier: 1,
                    class: 'is-reveal',
                    smartphone: {
                        smooth: true
                    },
                    tablet: {
                        smooth: true
                    }
                });

                window.locomotiveScroll = locomotiveInstance.current;
            } catch (error) {
                console.warn('Locomotive scroll failed to initialize:', error);
            }
        };

        initScroll();

        return () => {
            if (locomotiveInstance.current) {
                locomotiveInstance.current.destroy();
                window.locomotiveScroll = null;
            }
        };
    }, [isClient]);

    // Scroll to top on route change
    useEffect(() => {
        if (locomotiveInstance.current) {
            locomotiveInstance.current.scrollTo(0, {
                duration: 0,
                disableLerp: true
            });
            // Also need to update the scroll instance to recalculate page height
            setTimeout(() => {
                locomotiveInstance.current.update();
            }, 100);
        } else {
            // Fallback for when locomotive is not yet initialized or failed
            window.scrollTo(0, 0);
        }
    }, [pathname, searchParams]);

    return (
        <div data-scroll-container ref={scrollRef}>
            {children}
        </div>
    );
}
