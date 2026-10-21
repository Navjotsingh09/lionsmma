import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClubMap } from '@/components/club-map';
import { Icon, type IconName } from '@/components/icons';
import { PhotoHero } from '@/components/sections';
import { Timetable } from '@/components/timetable';
import { Accordion, Breadcrumb, ButtonLink } from '@/components/ui';
import { clubs, directionsUrl, DAYS, EMAIL, firstSession, getClub, nearby, telHref } from '@/data/clubs';

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/clubs/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const c = getClub(slug);
  if (!c) return {};
  return {
    title: `${c.name} club`,
    description: `Lions MMA ${c.name} at ${c.venue}, ${c.street}, ${c.postcode}. Timetable, contact details and free first class.`,
  };
}

const firstClass: { icon: IconName; title: string; body: string }[] = [
  { icon: 'user', title: 'Wear sportswear', body: 'A T-shirt and shorts or leggings is perfect.' },
  { icon: 'clock', title: 'Arrive 10 minutes early', body: 'Say hello to the coach before the class starts.' },
  { icon: 'shield', title: 'No kit needed', body: 'Just bring a water bottle for your first class.' },
  { icon: 'users', title: 'Bring the family', body: 'Many clubs run kids and adults classes on the same evening.' },
];

export default async function ClubPage({ params }: PageProps<'/clubs/[slug]'>) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();

  const days = DAYS.filter((d) => club.sessions.some((s) => s.day === d));
  const groups = [...new Set(club.sessions.map((s) => (s.group === 'Women' ? 'women' : s.group.toLowerCase())))];
  const disciplines = [...new Set(club.sessions.map((s) => s.discipline))];
  const next = firstSession(club);
  const others = (nearby[club.slug] ?? []).map(getClub).filter((c) => !!c);
  const bookHref = `/book?club=${club.slug}`;

  return (
    <div className="pb-24 md:pb-0">
      <div className="hidden px-10 py-4 md:block">
        <Breadcrumb items={[{ href: '/clubs', label: 'Clubs' }, { label: club.name }]} />
      </div>
      <PhotoHero photo={club.photo} alt={`Training at Lions MMA ${club.name}`} height="md:h-[560px]" mobileHeight="h-[480px]" preload mobilePosition="object-center">
        <div className="flex flex-col gap-3 md:mb-16 md:max-w-[560px] md:gap-4">
          <p className="flex items-center gap-2 text-tiny text-white/90">
            <Icon name="pin" size={14} /> {club.venue}
            {club.venueDetail && ` · ${club.venueDetail}`}
          </p>
          <h1 className="text-display-m md:text-display">{club.name}</h1>
          <p className="max-w-[440px] text-small text-white/85 md:text-body">
            {club.sessions.length
              ? `${disciplines.join(', ')} for ${groups.join(', ').replace(/, ([^,]*)$/, ' and $1')}. Your first class is free.`
              : 'Our newest club. The timetable is coming soon — get in touch to find out more.'}
          </p>
          <div className="hidden gap-2 pt-2 md:flex">
            <ButtonLink href={bookHref} variant="white" size="l">
              Book a free class
            </ButtonLink>
            <ButtonLink href={directionsUrl(club)} variant="glass" size="l" target="_blank" rel="noreferrer">
              Get directions
            </ButtonLink>
          </div>
        </div>
        {club.sessions.length > 0 && (
          <dl className="absolute bottom-12 left-12 hidden items-center gap-6 md:flex">
            {[
              [`${club.sessions.length} ${club.sessions.length === 1 ? 'class' : 'classes'} a week`, days.join(', ').replace(/, ([^,]*)$/, ' and $1')],
              [disciplines.join(' · '), `${club.sessions.map((s) => s.detail).filter(Boolean).length ? 'Grouped by age and level' : 'All welcome'}`],
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
        )}
      </PhotoHero>

      {/* Mobile quick info */}
      <div className="flex flex-col gap-3.5 px-5 pt-5 md:hidden">
        <p className="flex items-center gap-3 text-body">
          <Icon name="pin" /> {club.street}, {club.town} {club.postcode}
        </p>
        <a href={telHref(club.phone)} className="flex items-center gap-3 text-body">
          <Icon name="phone" /> {club.phone}
        </a>
        <div className="flex gap-2">
          <ButtonLink href={bookHref} full>
            Book a free class
          </ButtonLink>
          <ButtonLink href={directionsUrl(club)} variant="outline" full target="_blank" rel="noreferrer">
            Directions
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-5 pt-10 pb-14 md:flex-row md:gap-16 md:px-10 md:pt-18 md:pb-30">
        <div className="flex flex-col gap-14 md:w-[760px] md:shrink-0">
          {club.sessions.length ? (
            <Timetable sessions={club.sessions} slug={club.slug} />
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-h1-m md:text-h2">Timetable</h2>
              <p className="rounded-xl bg-surface p-6 text-body">
                The {club.name} timetable is coming soon. Call {club.phone} or email{' '}
                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                  {EMAIL}
                </a>{' '}
                to find out when classes start.
              </p>
            </div>
          )}

          <section className="flex flex-col gap-5">
            <h2 className="text-h4 md:text-h3">Your first class</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {firstClass.map((f) => (
                <li key={f.title} className="flex gap-3.5 rounded-xl bg-surface p-5 md:flex-col md:gap-2.5">
                  <Icon name={f.icon} size={20} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-lead">{f.title}</span>
                    <span className="text-small text-muted">{f.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="pb-2 text-h4 md:text-h3">Questions about {club.name}</h2>
            <Accordion q="Which class should I start in?">
              Start in a beginners class if your club has one{club.sessions.some((s) => s.detail) ? ' — this club groups classes by age and level' : ''}. Your coach will move you up as you improve.
            </Accordion>
            <Accordion q="Can I just turn up?">Please book first so the coach knows to expect you. It takes a minute and your first class is free.</Accordion>
            <Accordion q="How do I contact the club?">
              Call or text {club.phone}
              {club.contact ? ` (${club.contact})` : ''}, or email{' '}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </Accordion>
          </section>
        </div>

        <aside className="flex flex-1 flex-col gap-4 md:sticky md:top-20 md:self-start">
          <div className="hidden flex-col gap-5 rounded-2xl border border-line p-6 md:flex">
            <ClubMap selected={club.slug} labels={false} className="h-[200px]" />
            <div className="flex gap-3">
              <Icon name="pin" className="mt-0.5 shrink-0" />
              <div>
                <p className="text-body">{club.venue}</p>
                <p className="text-small text-muted">
                  {club.venueDetail && `${club.venueDetail}, `}
                  {club.street}, {club.town} {club.postcode}
                </p>
              </div>
            </div>
            <a href={telHref(club.phone)} className="flex gap-3">
              <Icon name="phone" className="mt-0.5 shrink-0" />
              <span>
                <span className="block text-body">{club.phone}</span>
                <span className="text-small text-muted">{club.contact ? `${club.contact} · call or text` : 'Call or text the club'}</span>
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex gap-3 text-body">
              <Icon name="mail" className="mt-0.5 shrink-0" /> {EMAIL}
            </a>
            <ButtonLink href={bookHref} size="l" full>
              Book a free class
            </ButtonLink>
            <ButtonLink href={telHref(club.phone)} variant="outline" size="l" full>
              Call the club
            </ButtonLink>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl bg-surface p-6">
            <p className="pb-1 text-lead">Other clubs nearby</p>
            {others.map((o) => (
              <Link key={o.slug} href={`/clubs/${o.slug}`} className="flex items-center gap-3 border-t border-line py-3 first-of-type:border-t-0 md:border-t-0">
                <div className="relative size-10 overflow-hidden rounded-md">
                  <Image src={o.photo} alt="" fill sizes="40px" className="object-cover" />
                </div>
                <span className="flex flex-1 flex-col">
                  <span className="text-body">{o.name}</span>
                  <span className="text-small text-muted">{o.sessions.length ? [...new Set(o.sessions.map((s) => s.name))].slice(0, 2).join(' · ') : 'Timetable coming soon'}</span>
                </span>
                <Icon name="chevronRight" size={16} />
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile sticky booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-line bg-white px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
        <span className="flex flex-1 flex-col">
          <span className="text-small">Free first class</span>
          <span className="text-tiny text-muted">{next ? `Next: ${next}` : 'Get in touch'}</span>
        </span>
        <ButtonLink href={bookHref}>Book now</ButtonLink>
      </div>
    </div>
  );
}
