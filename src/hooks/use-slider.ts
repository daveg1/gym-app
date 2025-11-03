import { useEffect, useRef } from "react";

interface TouchData {
  x: number;
  diff: number;
  anim: Animation | null;
}

export function useSlider<T extends HTMLElement>() {
  const touchTarget = useRef<T>(null);

  const touchData = useRef<TouchData>({} as TouchData);
  const DRAG_MAX = 72;
  touchData.current.diff = 0;

  function handleTouchStart(ev: TouchEvent) {
    touchData.current.x = ev.touches[0].clientX;
    if (touchData.current.anim) {
      touchData.current.anim.cancel();
    }
  }

  function handleTouchMove(ev: TouchEvent) {
    const x1 = touchData.current.x;
    const x2 = ev.touches[0].clientX;
    const diff = x2 - x1;

    const target = touchTarget.current as unknown as HTMLElement;
    target.style.transform = `translateX(${diff + touchData.current.diff}px)`;
  }

  function handleTouchEnd() {
    const target = touchTarget.current as unknown as HTMLElement;
    const { right: elemRight } = target.getBoundingClientRect();
    const padding = 24;

    const right = window.innerWidth - elemRight - padding;
    const x = right < DRAG_MAX / 2 ? 0 : -DRAG_MAX;

    touchData.current.anim = target.animate(
      { transform: `translateX(${x}px)` },
      { fill: "forwards", duration: 150, easing: "ease-out" },
    );
    touchData.current.diff = x;
  }

  useEffect(() => {
    if (touchTarget.current) {
      const target = touchTarget.current as HTMLElement;
      target.addEventListener("touchstart", handleTouchStart);
      target.addEventListener("touchmove", handleTouchMove);
      target.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (touchTarget.current) {
        const target = touchTarget.current as HTMLElement;
        target.removeEventListener("touchstart", handleTouchStart);
        target.removeEventListener("touchmove", handleTouchMove);
        target.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [touchTarget]);

  return touchTarget;
}
