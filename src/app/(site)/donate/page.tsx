import type { Metadata } from 'next';
import Image from 'next/image';
import { DonateWidget } from '@/components/donate-widget';
import { Icon } from '@/components/icons';
import { Accordion, Check } from '@/components/ui';
import { EMAIL } from '@/data/clubs';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Any amount helps. Donations help Lions MMA work with more children in Punjab and run more drugs education camps. #ABetterPunjab',
};

const where = ['Drugs education camps in schools', 'Free martial arts classes for children', 'Full-time social workers', 'A Gurbani educational course in schools'];

export default function DonatePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-16 md:pr-10 md:pb-24 md:pl-2">
        <div className="px-2 md:w-[700px] md:shrink-0 md:px-0">
          <div className="relative h-[300px] overflow-hidden rounded-[14px] md:h-[760px] md:rounded-2xl">
            <Image src="/photos/punjab-gym.jpg" alt="Teenagers training with a Sikh coach in a gym in Punjab" fill preload sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/80 to-transparent md:block" />
            <dl className="absolute inset-x-10 bottom-10 hidden grid-cols-3 gap-3 md:grid">
              {[
                ['1,000+', 'students reached'],
                ['52', 'schools visited'],
                ['5,000', 'children — next year’s goal'],
              ].map(([a, b]) => (
                <div key={a} className="rounded-xl bg-black/35 px-4 py-3.5 text-white glass">
                  <dt className="text-h3">{a}</dt>
                  <dd className="text-tiny text-white/80">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-5 pt-8 pb-12 md:max-w-[520px] md:gap-6 md:px-0 md:pt-16">
          <p className="flex items-center gap-2 text-small">
            <Icon name="heart" size={14} /> #ABetterPunjab
          </p>
          <h1 className="text-display-m md:text-display">
            Any amount helps
            <br className="hidden md:block" /> us reach our goals
          </h1>
          <p className="text-small text-muted md:text-body">
            Your donations help us increase the number of children we can work with and the number of camps we can run. We plan to reach over 5,000 children next year, with full-time support for children dealing with substance abuse.
          </p>
          <DonateWidget donateUrl={process.env.DONATE_URL || undefined} />
        </div>
      </div>
      <section className="flex flex-col gap-6 bg-surface px-5 py-12 md:flex-row md:gap-20 md:py-24 md:pr-10 md:pl-[220px]">
        <div className="flex flex-col gap-3.5 md:w-[400px] md:shrink-0">
          <p className="text-small text-muted">Where your money goes</p>
          <h2 className="text-h1-m md:text-h1">
            Helping children
            <br className="hidden md:block" /> in Punjab
          </h2>
        </div>
        <div className="flex flex-col gap-3.5 md:w-[520px]">
          {where.map((w) => (
            <Check key={w}>{w}</Check>
          ))}
          <div className="pt-4">
            <Accordion q="Can I give every month?">Yes — choose “Give monthly” above.</Accordion>
            <Accordion q="Who do I contact about a donation?">
              Email <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a> and we’ll help.
            </Accordion>
            <Accordion q="Can I help in other ways?">Yes — volunteer your time or skills. Whatever your field of work, there is something you can do.</Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
