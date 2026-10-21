'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DAYS, formatRange, type Group, type Session } from '@/data/clubs';
import { cx, Tag } from './ui';

const LABEL: Record<Group, string> = { Kids: 'Kids', Adults: 'Adults', Women: 'Women’s' };

export function Timetable({ sessions, slug }: { sessions: Session[]; slug: string }) {
  const groups = (['Kids', 'Adults', 'Women'] as Group[]).filter((g) => sessions.some((s) => s.group === g));
  const [filter, setFilter] = useState<Group | 'All'>('All');
  const shown = sessions.filter((s) => filter === 'All' || s.group === filter);
  const byDay = DAYS.map((d) => [d, shown.filter((s) => s.day === d)] as const).filter(([, s]) => s.length);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-h1-m md:text-h2">Timetable</h2>
        {groups.length > 1 && (
          <div className="flex self-start rounded-full bg-surface p-[3px]" role="group" aria-label="Filter timetable">
            {(['All', ...groups] as const).map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={filter === g}
                onClick={() => setFilter(g)}
                className={cx('rounded-full px-3.5 py-1.5 text-small transition-colors', filter === g ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink')}
              >
                {g === 'All' ? 'All' : LABEL[g]}
              </button>
            ))}
          </div>
        )}
      </div>
      {byDay.map(([day, list]) => (
        <section key={day} className="flex flex-col gap-2">
          <h3 className="text-small text-muted">{day}</h3>
          <ul>
            {list.map((s) => (
              <li key={s.name + s.start} className="flex items-center gap-4 border-t border-line py-3.5">
                <span className="hidden w-[130px] shrink-0 text-body md:block">{formatRange(s)}</span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-body md:text-lead">{s.name}</span>
                  <span className="text-small text-muted">
                    <span className="md:hidden">{formatRange(s)}</span>
                    {s.detail && <span className="md:hidden"> · </span>}
                    {s.detail}
                    {s.instructor && ` · ${s.instructor}`}
                  </span>
                </span>
                <span className="hidden md:inline-flex">
                  <Tag>{LABEL[s.group]}</Tag>
                </span>
                <Link
                  href={`/book?club=${slug}&class=${encodeURIComponent(`${s.day}-${s.start}`)}`}
                  className="rounded-full border border-line px-5 py-2.5 text-small hover:bg-surface"
                  aria-label={`Book ${s.name} on ${s.day} at ${formatRange(s)}`}
                >
                  Book
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
