import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from '@/components/carousel';
import { Gallery } from '@/components/gallery';
import { GoalsScroller } from '@/components/goals-scroller';
import { Icon } from '@/components/icons';
import { ClosingCTA, PhotoHero, TilesRow } from '@/components/sections';
import { Accordion, ButtonLink, Check } from '@/components/ui';
import { clubs } from '@/data/clubs';
import { coaches, included, punjabStories, steps } from '@/data/site';

const avatars = ['/photos/avatar-1.jpg', '/photos/avatar-2.jpg', '/photos/avatar-3.jpg'];

function Avatars({ size = 26 }: { size?: number }) {
  return (
    <span className="flex">
      {avatars.map((a, i) => (
        <Image key={a} src={a} alt="" width={size} height={size} className="rounded-full border-2 border-white" style={{ marginLeft: i ? -8 : 0 }} />
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <PhotoHero photo="/photos/hero-fighter.jpg" alt="A young Sikh man in a black patka with orange hand wraps, in front of a glowing orange circle" preload>
        <div className="flex flex-col gap-4 md:mb-[150px] md:max-w-[520px] md:gap-5">
          <p className="flex items-center gap-2 text-tiny text-white/90">
            <Icon name="check" size={14} /> Your first class is free
          </p>
          <h1 className="text-display-m md:text-display">
            Martial arts for
            <br className="hidden md:block" /> the whole family
          </h1>
          <p className="max-w-[430px] text-small text-white/85 md:text-body">Muay Thai, Jiu-Jitsu, boxing and MMA for kids and adults — run from Gurdwaras across the UK since 2010.</p>
          <div className="flex flex-col gap-2 pt-1.5 md:flex-row md:pt-3">
            <ButtonLink href="/book" variant="white" size="l">
              Book a free class
            </ButtonLink>
            <ButtonLink href="/clubs" variant="glass" size="l">
              Find your club
            </ButtonLink>
          </div>
        </div>
        <div className="absolute inset-x-12 bottom-12 hidden items-end justify-between md:flex">
          <dl className="flex items-center gap-6">
            {[
              ['9 UK clubs', 'Bradford to Gravesend'],
              ['Ages 5 and up', 'Kids, teens and adults'],
              ['Since 2010', 'Run by the community'],
            ].map(([a, b], i) => (
              <div key={a} className="flex items-center gap-6">
                {i > 0 && <span className="h-8 w-px bg-white/30" />}
                <div>
                  <dt className="text-small">{a}</dt>
                  <dd className="text-tiny text-white/65">{b}</dd>
                </div>
              </div>
            ))}
          </dl>
          <Link href="/book?club=hitchin" className="flex items-center gap-3 rounded-xl bg-white/92 py-2.5 pr-2.5 pl-3.5 text-ink glass">
            <span className="flex flex-col">
              <span className="text-tiny text-muted">Next free class near you</span>
              <span className="text-small">Kids Muay Thai · Sat 9:00am, Hitchin</span>
            </span>
            <span className="rounded-full bg-black px-5 py-2.5 text-small text-white">Book</span>
          </Link>
        </div>
      </PhotoHero>

      {/* Trust strip */}
      <section className="flex flex-col items-center gap-4 px-5 pt-8 pb-6 md:gap-5 md:px-10 md:pt-12 md:pb-10">
        <p className="flex items-center gap-2.5 text-tiny md:text-small">
          <Avatars /> Trusted by families at Gurdwaras across the UK
        </p>
        <ul className="flex max-w-[1360px] flex-wrap justify-center gap-x-4 gap-y-1.5 md:gap-x-10">
          {clubs.map((c) => (
            <li key={c.slug}>
              <Link href={`/clubs/${c.slug}`} className="text-small text-muted/70 transition-colors hover:text-ink md:text-lead">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="flex flex-col gap-6 py-12 md:items-center md:gap-12 md:px-10 md:pt-24 md:pb-30">
        <div className="flex flex-col gap-2 px-5 md:items-center md:gap-3 md:px-0">
          <h2 className="text-h1-m md:text-h2">How it works</h2>
          <p className="text-small text-muted md:text-body">Start with a free class. Then train every week, close to home.</p>
        </div>
        <ol className="flex gap-3 overflow-x-auto px-5 scrollbar-none md:gap-6 md:overflow-visible md:px-0">
          {steps.map((s, i) => (
            <li key={s.title} className="flex w-[220px] shrink-0 flex-col gap-3.5 md:w-[236px]">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={s.photo} alt="" fill sizes="236px" className="object-cover" />
                <span className="absolute top-2.5 left-2.5 grid size-[22px] place-items-center rounded-md bg-white/80 text-tiny">{i + 1}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lead">{s.title}</h3>
                <p className="text-small text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <GoalsScroller />

      {/* What's included */}
      <section className="flex flex-col items-center gap-5 px-5 py-16 md:gap-7 md:py-30">
        <p className="text-tiny md:text-small">Your membership includes so much more.</p>
        <h2 className="text-center text-h1-m md:text-h1">
          Everything your family needs,
          <br className="hidden md:block" /> starting with a free class
        </h2>
        <dl className="w-full max-w-[480px] py-3">
          {included.map(([a, b], i) => (
            <div key={a} className={`flex rounded px-2.5 py-[7px] text-small ${i % 2 === 0 ? 'bg-surface' : ''}`}>
              <dt className="w-[140px] shrink-0 md:w-[170px]">{a.replace('*', '')}</dt>
              <dd className="text-muted">{b}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href="/book">Book a free class</ButtonLink>
      </section>

      {/* Coaches */}
      <section className="flex flex-col gap-8 pb-16 md:gap-12 md:pb-30">
        <h2 className="px-5 text-h1-m md:pl-[220px] md:text-h1">
          Led by coaches who give their
          <br className="hidden md:block" /> time to the community
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 scrollbar-none md:gap-8 md:pl-[220px]">
          {coaches.map((c, i) => (
            <article key={c.name} className="flex shrink-0 flex-col gap-1.5 md:flex-row md:gap-5">
              {i > 0 && <span className="hidden h-[180px] w-px bg-line md:block" />}
              <div className="relative h-[280px] w-[240px] shrink-0 overflow-hidden rounded-lg md:h-[180px] md:w-[150px]">
                <Image src={c.photo} alt={c.name} fill sizes="240px" className="object-cover" />
              </div>
              <div className="flex w-[240px] flex-col gap-1.5 md:w-[220px]">
                <p className="text-tiny text-muted">{c.club}</p>
                <h3 className="text-lead">{c.name}</h3>
                <p className="text-small text-muted">{c.role}</p>
                <p className="text-small">{c.body}</p>
                <Link href={c.href} className="text-tiny underline-offset-4 hover:underline">
                  See the timetable
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Punjab impact */}
      <section className="flex flex-col gap-8 bg-surface py-14 md:gap-10 md:py-24">
        <div className="flex flex-col gap-3 px-5 md:gap-3.5 md:pl-[220px]">
          <p className="flex items-center gap-2 text-small">
            <Icon name="heart" size={14} /> #ABetterPunjab
          </p>
          <h2 className="text-h1-m md:text-h1">
            Inspiring and empowering
            <br className="hidden md:block" /> the youth of Punjab
          </h2>
          <p className="text-small text-muted md:text-body">Drug and alcohol awareness camps, and free martial arts in schools.</p>
        </div>
        <Carousel label="Punjab projects" className="scroll-pl-5 gap-4 px-5 md:scroll-pl-[220px] md:gap-8 md:pl-[220px] md:pr-10">
          {punjabStories.map((s) => (
            <Link key={s.title} href="/punjab-projects" className="flex w-[300px] shrink-0 snap-start flex-col gap-3.5 md:w-[440px]">
              <div className="relative aspect-[440/260] overflow-hidden rounded-lg">
                <Image src={s.photo} alt="" fill sizes="440px" className="object-cover" />
              </div>
              <p className="text-tiny text-muted">Punjab projects</p>
              <h3 className="text-lead">{s.title}</h3>
              <p className="text-small text-muted">{s.body}</p>
            </Link>
          ))}
        </Carousel>
      </section>

      <TilesRow />

      {/* Membership */}
      <section className="flex flex-col gap-10 px-5 pb-16 md:flex-row md:justify-center md:gap-12 md:px-10 md:pt-10 md:pb-30">
        <div className="md:w-[450px]">
          <Gallery
            photos={['/photos/grading-day.jpg', '/photos/kids-class.jpg', '/photos/teen-muay-thai.jpg', '/photos/womens-muay-thai.jpg', '/photos/coach-amarjit.jpg', '/photos/gurdwara-hall.jpg', '/photos/punjab-school-camp.jpg']}
            overlay={
              <>
                <div className="absolute top-4 left-4 flex flex-col rounded-xl bg-black/30 px-4 py-3.5 text-white glass md:top-5 md:left-5">
                  <span className="text-small text-white/85">Every club</span>
                  <span className="text-lead md:text-h4">Your first class is free</span>
                </div>
                <div className="absolute inset-x-4 bottom-4 hidden items-center gap-4 rounded-xl bg-black/40 px-4 py-3.5 text-white glass md:inset-x-5 md:bottom-5 md:flex">
                  <div className="flex flex-col">
                    <span className="text-small text-white/80">Since</span>
                    <span className="text-h2">2010</span>
                  </div>
                  <p className="text-small text-white/85">Lions MMA opened its first door in December 2010 and has grown with Sevadaars across the UK and Punjab.</p>
                </div>
              </>
            }
          />
        </div>
        <div className="flex flex-col gap-5 md:w-[440px] md:gap-[22px]">
          <p className="flex items-center gap-2 text-tiny text-muted">
            <Avatars size={22} /> 9 UK clubs · Families training since 2010
          </p>
          <h2 className="text-display-m md:text-display">
            Lions MMA
            <br />
            membership
          </h2>
          <p className="text-small text-muted md:text-body">Confidence, discipline and self-esteem — with a good workout, traditional training and a family atmosphere.</p>
          <p className="flex items-end gap-1.5">
            <span className="text-h1-m md:text-h1">Free</span>
            <span className="pb-1.5 text-small text-muted">first class, at any club</span>
          </p>
          <ul className="flex flex-col gap-3">
            {['No kit needed for your first class', 'Muay Thai, Jiu-Jitsu, boxing and MMA', 'Classes split by age and level', 'Kids, adults and women’s classes', 'Run from Gurdwaras across the UK', 'Train alongside your family'].map((s) => (
              <li key={s}>
                <Check>{s}</Check>
              </li>
            ))}
          </ul>
          <ButtonLink href="/book" size="l" full>
            Book your free class
          </ButtonLink>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-tiny">
            <span className="flex items-center gap-1.5">
              <Icon name="users" size={13} /> Kids and adults
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="pin" size={13} /> 9 clubs
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="heart" size={13} /> Family atmosphere
            </span>
          </p>
          <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
            <dl className="grid grid-cols-3 gap-4">
              {[
                ['1,000+', 'students reached in Punjab'],
                ['52', 'schools visited for awareness camps'],
                ['9', 'UK clubs, all on Gurdwara premises'],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="text-h4">{a}</dt>
                  <dd className="text-tiny text-muted">{b}</dd>
                </div>
              ))}
            </dl>
            <p className="text-tiny text-muted/80">Figures from Lions MMA’s Punjab projects.</p>
          </div>
          <div>
            <Accordion q="Do I need any experience?">No. Learning martial arts is something everyone can do, and classes are split by age and level.</Accordion>
            <Accordion q="What should I wear?">Comfortable sportswear — a T-shirt and shorts or leggings — and a water bottle.</Accordion>
            <Accordion q="Which club should I join?">
              The one nearest you. <Link href="/clubs" className="underline underline-offset-4">See all nine clubs and their timetables</Link>.
            </Accordion>
            <Accordion q="Can parents train too?">Yes — many clubs run kids and adults classes on the same evening.</Accordion>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
