import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { tiles } from '@/data/site';
import { PlayIcon } from './icons';
import { ButtonLink, Check, Cover, cx, Shade } from './ui';

/** Rounded full-width photo card with a dark fade and copy bottom-left (the Superpower hero). */
export function PhotoHero({
  photo,
  alt,
  children,
  height = 'md:h-[820px]',
  mobileHeight = 'h-[640px]',
  preload,
  fade = 'lr',
  className,
  mobilePosition = 'object-[70%_center]',
  video,
}: {
  photo: string;
  alt: string;
  children: ReactNode;
  height?: string;
  mobileHeight?: string;
  preload?: boolean;
  fade?: 'lr' | 'bt';
  className?: string;
  mobilePosition?: string;
  /** Optional looping background video; `photo` is used as its poster + fallback. */
  video?: string;
}) {
  return (
    <div className={cx('px-2', className)}>
      <div className={cx('relative overflow-hidden rounded-[14px] bg-black text-white md:rounded-2xl', mobileHeight, height)}>
        {video ? (
          <video
            className={cx('absolute inset-0 size-full object-cover', mobilePosition, 'md:object-center')}
            autoPlay
            muted
            loop
            playsInline
            poster={photo}
            preload="auto"
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Cover src={photo} alt={alt} sizes="100vw" preload={preload} className={cx(mobilePosition, 'md:object-center')} />
        )}
        <Shade dir="bt" strength={0.9} className="md:hidden" />
        <Shade dir={fade} strength={0.8} className="hidden md:block" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-12">{children}</div>
      </div>
    </div>
  );
}

export function ClosingCTA() {
  return (
    <PhotoHero photo="https://images.pexels.com/photos/11391876/pexels-photo-11391876.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="A young Sikh girl throwing a punch with orange boxing gloves" height="md:h-[720px]" mobileHeight="h-[560px]" className="pb-2" mobilePosition="object-[75%_center]">
      <div className="flex max-w-[600px] flex-col gap-4 md:gap-5 md:pb-24">
        <p className="text-tiny text-white/85">Free first class at every club</p>
        <h2 className="text-display-m md:text-display">
          Confidence, discipline
          <br className="hidden md:block" /> and self-esteem
        </h2>
        <div className="hidden flex-wrap gap-x-4 gap-y-2 md:flex">
          <Check tone="light">All ages from 5</Check>
          <Check tone="light">Run from the Gurdwara</Check>
          <Check tone="light">Kids, adults and women’s classes</Check>
        </div>
        <div className="flex flex-col gap-2 pt-2 md:flex-row">
          <ButtonLink href="/book" variant="white" size="l">
            Book a free class
          </ButtonLink>
          <ButtonLink href="/clubs" variant="glass" size="l">
            Find your club
          </ButtonLink>
        </div>
      </div>
    </PhotoHero>
  );
}

export function TilesRow() {
  return (
    <section className="flex flex-col gap-8 py-16 md:gap-10 md:py-30">
      <h2 className="px-5 text-h1-m md:pl-[220px] md:text-h1">
        Every week, at a
        <br />
        Gurdwara near you
      </h2>
      <div className="flex gap-3 overflow-x-auto px-5 scrollbar-none md:justify-center md:px-0">
        {tiles.map((t, i) => (
          <Link key={t.title + t.place} href={t.href} className="group relative h-[300px] w-[180px] shrink-0 overflow-hidden rounded-xl md:h-[340px] md:w-[200px]">
            <Image src={t.photo} alt="" fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
            {i % 3 === 1 && (
              <span className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-black/35 text-white glass">
                <PlayIcon />
              </span>
            )}
            <span className="absolute inset-x-3 bottom-3 flex flex-col text-white">
              <span className="text-body">{t.title}</span>
              <span className="text-small text-white/75">{t.place}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, children, center }: { eyebrow?: string; title: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <div className={cx('flex flex-col gap-3 px-5 pt-10 pb-6 md:gap-4 md:px-10 md:pt-24 md:pb-14', center && 'md:items-center md:text-center')}>
      {eyebrow && <p className="hidden text-small text-muted md:block">{eyebrow}</p>}
      <h1 className="text-display-m md:text-display">{title}</h1>
      {children && <div className="max-w-[560px] text-small text-muted md:text-body">{children}</div>}
    </div>
  );
}
