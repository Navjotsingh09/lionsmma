import Link from 'next/link';
import { clubs, type Club } from '@/data/clubs';
import { cx } from './ui';

// Simple stylised map: pins placed by latitude/longitude on a dotted panel.
const BOUNDS = { west: -2.7, east: 0.8, north: 54.15, south: 51.2 };
const LABELLED = new Set(['bradford', 'huddersfield', 'leicester', 'hitchin', 'gravesend', 'wolverhampton']);

export function ClubMap({ selected, visible, className, labels = true }: { selected?: string; visible?: Set<string>; className?: string; labels?: boolean }) {
  const pos = (c: Club) => ({
    left: `${((c.lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100}%`,
    top: `${((BOUNDS.north - c.lat) / (BOUNDS.north - BOUNDS.south)) * 100}%`,
  });
  return (
    <div
      className={cx('relative overflow-hidden rounded-xl bg-surface', className)}
      style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      role="group"
      aria-label="Map of Lions MMA clubs"
    >
      {clubs.map((c) => {
        const on = c.slug === selected;
        const dim = visible && !visible.has(c.slug);
        return (
          <Link
            key={c.slug}
            href={`/clubs/${c.slug}`}
            style={pos(c)}
            aria-label={`${c.name} club`}
            className={cx(
              'absolute flex -translate-x-1.5 -translate-y-1.5 items-center gap-1.5 rounded-full shadow-[0_2px_6px_rgba(0,0,0,.15)] transition-opacity',
              on ? 'z-10 bg-black py-1 pr-2.5 pl-1 text-tiny text-white' : 'bg-white p-[3px] hover:scale-110',
              dim && 'opacity-30',
            )}
          >
            <span className={cx('rounded-full', on ? 'size-3 bg-white' : 'size-2 bg-black')} />
            {on && c.name}
            {!on && labels && LABELLED.has(c.slug) && <span className="absolute left-4 text-tiny whitespace-nowrap text-muted">{c.name}</span>}
          </Link>
        );
      })}
    </div>
  );
}
