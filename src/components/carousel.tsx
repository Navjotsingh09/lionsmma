'use client';

import { Children, useRef, useState, type ReactNode } from 'react';
import { cx } from './ui';

/** Horizontal scroll-snap row with a Superpower-style progress indicator. */
export function Carousel({ children, className, progress = true, label }: { children: ReactNode; className?: string; progress?: boolean; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 32 : el.clientWidth;
    setIndex(Math.min(count - 1, Math.round(el.scrollLeft / step)));
  };

  const go = (i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - (parseFloat(getComputedStyle(el).paddingLeft) || 0), behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-8">
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
