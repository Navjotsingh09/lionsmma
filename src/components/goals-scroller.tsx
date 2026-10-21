'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { goals } from '@/data/site';
import { Accordion, cx } from './ui';

/**
 * Pinned scrollytelling section in the style of superpower.com.
 *
 * A tall track gives the scroll length; the stage inside is `sticky` so it
 * stays pinned while you scroll through the goals. The photo crossfade is
 * driven directly by scroll position every frame — but with a *hold → ease →
 * hold* curve rather than a linear blend, so each photo rests clean and the
 * transition happens in a quick, eased window (never two photos muddied
 * together for the whole scroll). React state only changes when the integer
 * step changes, so the copy animates once per step instead of thrashing a
 * keyframe every frame — that re-render churn is what read as "jerky".
 */

// smoothstep — eases in and out, 0→0, 1→1.
const smooth = (t: number) => t * t * (3 - 2 * t);
// Fraction of each step spent transitioning; the rest holds a clean photo.
const BAND = 0.34; // transition occupies the middle 34% of each step's scroll

export function GoalsScroller() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef<number | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const n = goals.length;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paint = (opacities: number[]) => {
      for (let i = 0; i < n; i++) {
        const node = imageRefs.current[i];
        if (!node) continue;
        const op = opacities[i];
        node.style.opacity = String(op);
        // Settled photo sits at scale 1; an incoming/outgoing one drifts
        // very slightly larger, giving a soft, living zoom-settle.
        node.style.transform = `scale(${(1 + (1 - op) * 0.035).toFixed(4)})`;
      }
    };

    const update = () => {
      frame.current = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const slot = rect.height / n;
      // Continuous position (0..n-1) of "now" across the stacked steps.
      const raw = slot > 0 ? Math.min(n - 1, Math.max(0, -rect.top / slot)) : 0;

      const lower = Math.min(n - 1, Math.floor(raw));
      const upper = Math.min(n - 1, lower + 1);
      const f = raw - lower; // 0..1 within the current step
      // Hold until the band starts, ease across it, hold after.
      const t = Math.min(1, Math.max(0, (f - (1 - BAND) / 2) / BAND));
      const e = smooth(t);

      const op = new Array(n).fill(0);
      if (lower === upper) {
        op[lower] = 1;
      } else {
        op[lower] = 1 - e;
        op[upper] = e;
      }
      paint(op);

      // Snap the "active" step at the band midpoint so copy swaps while the
      // photo is already mostly turned over — and only when it truly changes.
      const next = e < 0.5 ? lower : upper;
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    if (prefersReduced) {
      // No scrubbing — just show the first photo and let the tabs drive it.
      paint(goals.map((_, i) => (i === 0 ? 1 : 0)));
      return;
    }

    const onScroll = () => {
      if (frame.current == null) frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const jump = (i: number) => markers.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const g = goals[active];

  return (
    <section ref={sectionRef} aria-label="Our goals" className="relative" style={{ height: `${goals.length * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-black text-white">
        {goals.map((x, i) => (
          <div
            key={x.photo}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-[opacity,transform]"
            style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'scale(1)' : 'scale(1.035)' }}
          >
            <Image src={x.photo} alt="" fill sizes="100vw" priority={i === 0} className="object-cover" />
          </div>
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.55) 35%, rgba(0,0,0,0) 65%), linear-gradient(0deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 45%)' }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 md:hidden" />
        <div className="relative flex h-full flex-col justify-end gap-6 px-5 pt-20 pb-8 md:justify-between md:gap-0 md:px-10 md:py-24">
          <div className="flex max-w-[380px] flex-col gap-7">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Goals">
              {goals.map((x, i) => (
                <button
                  key={x.n}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => jump(i)}
                  className={cx('flex items-center gap-1.5 rounded-full text-tiny transition-all duration-300 ease-out', i === active ? 'bg-white/90 py-1 pr-3 pl-1 text-ink' : 'text-white')}
                >
                  <span className={cx('grid size-6 place-items-center rounded-full border transition-colors duration-300', i === active ? 'border-ink/40' : 'border-white/45')}>{x.n}</span>
                  {i === active && x.title}
                </button>
              ))}
            </div>
            <div key={g.n} className="flex flex-col gap-3 animate-[rise_.6s_cubic-bezier(.22,1,.36,1)]">
              <h2 className="text-h1-m md:text-h3">{g.heading}</h2>
              <p className="text-small text-white/85 md:text-body">{g.body}</p>
            </div>
          </div>
          <div key={`faq-${g.n}`} className="flex flex-col gap-1.5 animate-[rise_.6s_cubic-bezier(.22,1,.36,1)]">
            {g.faqs.map((f) => (
              <Accordion key={f.q} q={f.q} dark>
                {f.a}
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      {/* Scroll markers that drive the active goal */}
      <div className="absolute inset-0 -z-10">
        {goals.map((x, i) => (
          <div
            key={x.n}
            data-i={i}
            ref={(el) => {
              markers.current[i] = el;
            }}
            className="h-svh"
          />
        ))}
      </div>
    </section>
  );
}
