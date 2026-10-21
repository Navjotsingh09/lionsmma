'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { cx } from './ui';

/** Big photo with thumbnails underneath — the "product" gallery from the design. */
export function Gallery({ photos, overlay }: { photos: string[]; overlay?: ReactNode }) {
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative aspect-[450/560] overflow-hidden rounded-xl bg-surface">
        <Image src={photos[i]} alt="" fill sizes="(min-width: 768px) 450px, 100vw" className="object-cover" />
        {overlay}
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {photos.map((p, n) => (
          <button
            key={p}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Show photo ${n + 1}`}
            aria-pressed={n === i}
            className={cx('relative size-14 shrink-0 overflow-hidden rounded-md ring-offset-2 transition', n === i ? 'ring-2 ring-ink' : 'opacity-80 hover:opacity-100')}
          >
            <Image src={p} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
