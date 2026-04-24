import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  shouldStart: boolean,
  duration = 1800
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      setValue(0);
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [duration, shouldStart, target]);

  return value;
}
