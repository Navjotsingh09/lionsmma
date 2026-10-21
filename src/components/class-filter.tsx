'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getClub } from '@/data/clubs';
import { disciplines } from '@/data/site';
import { Icon } from './icons';
import { ButtonLink, cx, Tag } from './ui';

const FILTERS = ['All', 'Kids', 'Adults', 'Women'] as const;

export function ClassFilter() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('All');
  const list = disciplines.filter((d) => f === 'All' || (d.groups as readonly string[]).includes(f));

  return (
    <>
      <div className="flex gap-2 overflow-x-auto px-5 pt-6 pb-2 scrollbar-none md:justify-center md:pt-8" role="group" aria-label="Filter classes">
        {FILTERS.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={cx('shrink-0 rounded-full px-3.5 py-[7px] text-small transition-colors', f === x ? 'bg-black text-white' : 'border border-line hover:bg-surface')}
          >
            {x === 'Women' ? 'Women’s' : x}
          </button>
        ))}
      </div>
      <div className="grid gap-10 px-5 pt-6 pb-16 md:grid-cols-2 md:gap-x-6 md:gap-y-14 md:px-10 md:pt-8 md:pb-30 xl:mx-auto xl:w-[1384px]">
        {list.map((d) => {
          const clubs = d.clubs.map((s) => getClub(s)).filter((c) => !!c);
          return (
            <article key={d.name} className="flex flex-col gap-3 md:gap-4">
              <div className="relative aspect-[350/240] overflow-hidden rounded-xl md:aspect-[668/420]">
                <Image src={d.photo} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                <span className="absolute top-4 left-4 hidden items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-tiny text-white glass md:flex">
                  <Icon name="users" size={13} /> {d.who}
                </span>
              </div>
              <p className="text-tiny text-muted md:hidden">{d.who}</p>
              <div className="flex items-start gap-6">
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="text-h4 md:text-h3">{d.name}</h2>
                  <p className="text-small text-muted md:text-body">{d.body}</p>
                </div>
                <ButtonLink href={clubs.length === 1 ? `/clubs/${clubs[0].slug}` : '/clubs'} variant="outline" className="hidden md:inline-flex">
                  Find a class
                </ButtonLink>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {clubs.map((c) => (
                  <Link key={c.slug} href={`/clubs/${c.slug}`}>
                    <Tag>{c.name}</Tag>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
