import type { Metadata } from 'next';
import Link from 'next/link';
import { EnquiryForm } from '@/components/enquiry-form';
import { Icon, type IconName } from '@/components/icons';
import { EMAIL, MAIN_PHONE, telHref } from '@/data/clubs';
import { socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Email ${EMAIL}, call ${MAIN_PHONE} or send us a message about classes, clubs or our Punjab projects.`,
};

const cards: { icon: IconName; label: string; value: string; action: string; href: string; external?: boolean }[] = [
  { icon: 'mail', label: 'Email us', value: EMAIL, action: 'Send an email', href: `mailto:${EMAIL}` },
  { icon: 'phone', label: 'Call us', value: MAIN_PHONE, action: 'Call now', href: telHref(MAIN_PHONE) },
  { icon: 'pin', label: 'Visit a club', value: '9 clubs across the UK', action: 'Find your club', href: '/clubs' },
];

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col gap-3 px-5 pt-10 pb-6 md:items-center md:gap-4 md:px-10 md:pt-24 md:pb-14 md:text-center">
        <p className="hidden text-small text-muted md:block">Contact us</p>
        <h1 className="text-display-m md:text-display">We’d love to hear from you</h1>
        <p className="text-small text-muted md:text-body">Questions about classes, clubs or our Punjab projects — we’re here to help.</p>
      </div>
      <ul className="grid gap-2.5 px-5 pb-10 md:grid-cols-3 md:gap-4 md:px-[220px] md:pb-18">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="flex items-center gap-3.5 rounded-xl bg-surface p-4 transition-colors hover:bg-line/60 md:flex-col md:items-start md:gap-7 md:rounded-2xl md:p-6">
              <Icon name={c.icon} size={22} className="shrink-0" />
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-tiny text-muted md:text-small">{c.label}</span>
                <span className="text-body md:text-h4">{c.value}</span>
              </span>
              <span className="hidden items-center gap-1 text-small md:flex">
                {c.action} <Icon name="chevronRight" size={14} />
              </span>
              <Icon name="chevronRight" size={16} className="md:hidden" />
            </Link>
          </li>
        ))}
      </ul>
      <section className="flex flex-col gap-8 px-5 pb-14 md:flex-row md:gap-20 md:px-[220px] md:pb-30">
        <div className="flex flex-col gap-3.5 md:w-[320px] md:shrink-0">
          <h2 className="text-h4 md:text-h2">Send a message</h2>
          <p className="text-small text-muted md:text-body">Fill in the form and the right person will get back to you.</p>
          <div className="hidden flex-col gap-2.5 pt-6 md:flex">
            <p className="text-small text-muted">Follow us</p>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-body hover:underline">
                {s.label} — {s.handle}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
