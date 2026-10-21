'use client';

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from './ui';

/** Horizontal scroll-snap row with a Superpower-style progress indicator. */
export function Carousel({
  children,
  className,
  progress = true,
  label,
  auto,
}: {
  children: ReactNode;
  className?: string;
  progress?: boolean;
  label: string;
  /** Auto-advance interval in ms. Pauses on hover/focus/interaction. */
  auto?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);
  const paused = useRef(false);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 32 : el.clientWidth;
    setIndex(Math.min(count - 1, Math.round(el.scrollLeft / step)));
  };

  const go = useCallback((i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - (parseFloat(getComputedStyle(el).paddingLeft) || 0), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!auto || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (paused.current) return;
      const el = ref.current;
      if (!el) return;
      const first = el.firstElementChild as HTMLElement | null;
      const step = first ? first.offsetWidth + 32 : el.clientWidth;
      const current = Math.round(el.scrollLeft / step);
      go((current + 1) % count);
    }, auto);
    return () => clearInterval(id);
  }, [auto, count, go]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <div className="flex flex-col gap-8" onMouseEnter={pause} onMouseLeave={resume} onFocusCapture={pause} onBlurCapture={resume} onPointerDownCapture={pause}>
      <div ref={ref} onScroll={onScroll} role="region" aria-label={label} tabIndex={0} className={cx('flex snap-x snap-mandatory overflow-x-auto scrollbar-none', className)}>
        {children}
      </div>
      {progress && count > 1 && (
        <div className="flex items-center gap-1.5 px-5 md:pl-[220px]">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show item ${i + 1}`}
              onClick={() => go(i)}
              className={cx('h-0.5 rounded-full transition-all', i === index ? 'w-14 bg-ink' : 'w-8 bg-line hover:bg-muted')}
            />
          ))}
          <span className="ml-2 text-tiny text-muted">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
