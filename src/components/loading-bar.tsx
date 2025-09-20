'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setLoading(true);
    setWidth(0); // Reset on new route
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!loading) return;

    // Start loading animation
    let animationFrameId: number;
    const animate = () => {
      setWidth((prev) => {
        if (prev >= 95) {
          cancelAnimationFrame(animationFrameId);
          return prev;
        }
        return prev + 2; // Adjust speed as needed
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const timer = setTimeout(() => {
      setLoading(false);
      setWidth(100);
      setTimeout(() => setWidth(0), 300); // Hide after completion
    }, 800); // Max loading time

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [loading]);

  if (!width) return null;

  return (
    <div
      className="loading-bar"
      style={{
        transform: `scaleX(${width / 100})`,
        transition: 'transform 0.2s ease-out',
      }}
    />
  );
}
