import Link from 'next/link';
import { EMAIL, MAIN_PHONE, telHref } from '@/data/clubs';
import { socials } from '@/data/site';
import { Logo } from './logo';
import { ButtonLink } from './ui';

const columns = [
  {
    title: 'Train',
    links: [
      { href: '/classes', label: 'Classes' },
      { href: '/clubs', label: 'Find a club' },
      { href: '/book', label: 'Book a free class' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/punjab-projects', label: 'Punjab projects' },
      { href: '/volunteer', label: 'Volunteer' },
      { href: '/donate', label: 'Donate' },
    ],
  },
  {
    title: 'Lions MMA',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/faqs', label: 'FAQs' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col gap-14 px-5 pt-14 pb-8 md:gap-24 md:px-10 md:pt-20 md:pb-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6">
            <p className="text-h1-m md:text-h2">Train like a lion.</p>
            <p className="max-w-[340px] text-body text-white/60">Martial arts for the whole family, run from Gurdwaras across the UK since 2010.</p>
            <ButtonLink href="/book" variant="white" size="l" className="self-start">
              Book a free class
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:gap-16">
            {columns.map((c) => (
              <div key={c.title} className="flex flex-col gap-3.5 text-small">
                <p className="text-white/45">{c.title}</p>
                {c.links.map((l) => (
                  <Link key={l.href} href={l.href} className="hover:text-white/70">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-3.5 text-small">
              <p className="text-white/45">Get in touch</p>
              <a href={`mailto:${EMAIL}`} className="hover:text-white/70">
                {EMAIL}
              </a>
              <a href={telHref(MAIN_PHONE)} className="hover:text-white/70">
                {MAIN_PHONE}
              </a>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white/70">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Logo color="orange" width={440} className="h-auto w-[280px] md:w-[440px]" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-tiny text-white/50">
            <span>© 2026 Lions MMA</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
