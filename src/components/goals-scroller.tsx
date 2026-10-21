'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { goals } from '@/data/site';
import { Accordion, cx } from './ui';

/**
 * Superpower-style sticky section: the photo stays pinned while you scroll
 * through the four goals; the numbered tabs show where you are.
 */
export function GoalsScroller() {
  const [active, setActive] = useState(0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    markers.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => markers.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const g = goals[active];

  return (
    <section aria-label="Our goals" className="relative" style={{ height: `${goals.length * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-black text-white">
        {goals.map((x, i) => (
          <Image
            key={x.photo}
            src={x.photo}
            alt=""
            fill
            sizes="100vw"
            className={cx('object-cover transition-opacity duration-700', i === active ? 'opacity-100' : 'opacity-0')}
          />
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
                  className={cx('flex items-center gap-1.5 rounded-full text-tiny transition-colors', i === active ? 'bg-white/90 py-1 pr-3 pl-1 text-ink' : 'text-white')}
                >
                  <span className={cx('grid size-6 place-items-center rounded-full border', i === active ? 'border-ink/40' : 'border-white/45')}>{x.n}</span>
                  {i === active && x.title}
                </button>
              ))}
            </div>
            <div key={g.n} className="flex flex-col gap-3 animate-[fade_.5s_ease]">
              <h2 className="text-h1-m md:text-h3">{g.heading}</h2>
              <p className="text-small text-white/85 md:text-body">{g.body}</p>
            </div>
          </div>
          <div key={`faq-${g.n}`} className="flex flex-col gap-1.5">
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
