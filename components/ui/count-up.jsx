"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function CountUp({ end, duration = 2, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const startAnimation = (timestamp) => {
      startTime = timestamp;
      updateCount(timestamp);
    };

    const updateCount = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(startAnimation);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
