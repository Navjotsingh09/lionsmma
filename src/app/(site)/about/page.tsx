import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoHero } from '@/components/sections';
import { goals, stats, story, values } from '@/data/site';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Lions MMA opened in December 2010. Every club runs from Gurdwara premises, so Sikh youth can learn self-defence in a relaxed, family environment.',
};

export default function AboutPage() {
  return (
    <>
      <PhotoHero photo="https://images.pexels.com/photos/5750886/pexels-photo-5750886.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Children in patkas sitting on mats listening to a coach, in a hall with a mural of Sikh warriors" height="md:h-[640px]" mobileHeight="h-[460px]" fade="bt" preload mobilePosition="object-center" video="/videos/about-hero.mp4">
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="text-tiny text-white/85 md:text-small">About Lions MMA</p>
          <h1 className="text-display-m md:text-display">
            Sikhi-based martial arts,
            <br className="hidden md:block" /> since 2010
          </h1>
        </div>
      </PhotoHero>

      <section className="flex flex-col gap-6 px-5 pt-12 md:flex-row md:gap-20 md:pt-24 md:pr-10 md:pl-[220px]">
        <div className="flex flex-col gap-3.5 md:w-[400px] md:shrink-0">
          <p className="text-small text-muted">Our story</p>
          <h2 className="text-h1-m md:text-h1">
            A martial arts club
            <br className="hidden md:block" /> like no other
          </h2>
        </div>
        <div className="flex max-w-[560px] flex-col gap-5">
          {story.map((p) => (
            <p key={p.slice(0, 20)} className="text-body md:text-lead">
              {p}
            </p>
          ))}
        </div>
      </section>

      <dl className="grid grid-cols-2 px-5 py-12 md:grid-cols-4 md:px-10 md:py-24">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5 border-t border-line pt-4 pr-3 pb-4 md:pt-6 md:pr-6">
            <dt className="order-2 text-tiny text-muted md:text-small">{s.label}</dt>
            <dd className="text-h1-m md:text-display">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-8 bg-surface px-5 py-12 md:gap-12 md:px-10 md:py-24">
        <div className="flex flex-col gap-3">
          <p className="text-small text-muted">Our goals</p>
          <h2 className="text-h1-m md:text-h1">Four things guide everything we do</h2>
        </div>
        <ol className="grid gap-3 md:grid-cols-4 md:gap-4">
          {goals.map((g) => (
            <li key={g.n} className="flex flex-col gap-2 rounded-2xl bg-white p-5 md:gap-10 md:p-6">
              <span className="text-small text-muted">{g.n}</span>
              <span className="flex flex-col gap-2.5">
                <span className="text-h4 md:text-h3">{g.title}</span>
                <span className="text-small text-muted">{g.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <figure className="flex flex-col gap-3 px-5 py-16 md:items-center md:gap-6 md:px-10 md:py-36 md:text-center">
        <span aria-hidden="true" className="text-display-m text-muted md:text-display">
          “
        </span>
        <blockquote className="text-display-m md:text-display">
          No drug users grow old,
          <br className="hidden md:block" /> because they die young.
        </blockquote>
        <figcaption className="text-small text-muted">
          The message behind our <Link href="/punjab-projects" className="underline underline-offset-4">Punjab projects</Link>
        </figcaption>
      </figure>

      <section className="flex flex-col gap-4 px-5 pb-12 md:flex-row md:items-center md:gap-10 md:px-10 md:pb-24">
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="text-h4 md:text-h2">What every student brings</h2>
          <p className="hidden text-body text-muted md:block">Students at Lions MMA follow five simple values.</p>
        </div>
        <ul className="flex flex-wrap gap-2 md:max-w-[680px] md:justify-end md:gap-2.5">
          {values.map((v) => (
            <li key={v} className="rounded-full bg-surface px-4 py-2 text-small md:px-5.5 md:py-3 md:text-lead">
              {v}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 px-5 pb-14 md:gap-8 md:px-10 md:pb-30">
        <h2 className="text-h1-m md:text-h1">Ready to help?</h2>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {[
            { href: '/volunteer', photo: 'https://images.pexels.com/photos/11391876/pexels-photo-11391876.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Volunteer', body: 'Whatever your skills, there’s something you can do to support thousands of children in Punjab.', cta: 'Join today' },
            { href: '/donate', photo: 'https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Donate', body: 'Any amount helps us run more camps and work with more children.', cta: 'Donate today' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group relative flex h-[260px] items-end overflow-hidden rounded-2xl text-white md:h-[420px]">
              <Image src={c.photo} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <span className="relative flex flex-col gap-3 p-5 md:p-7">
                <span className="text-h3 md:text-h2">{c.title}</span>
                <span className="hidden max-w-[480px] text-body text-white/85 md:block">{c.body}</span>
                <span className="self-start rounded-full bg-white px-5 py-2.5 text-small text-ink">{c.cta}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
