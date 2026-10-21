import type { Metadata } from 'next';
import { Accordion, ButtonLink } from '@/components/ui';
import { EMAIL, MAIN_PHONE } from '@/data/clubs';
import { faqs } from '@/data/site';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Everything you need to know before your first Lions MMA class — experience, kit, ages, membership and our Punjab projects.',
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-');

export default function FaqsPage() {
  return (
    <>
      <div className="flex flex-col gap-3 px-5 pt-10 pb-4 md:items-center md:gap-4 md:px-10 md:pt-24 md:pb-14 md:text-center">
        <p className="hidden text-small text-muted md:block">FAQs</p>
        <h1 className="text-display-m md:text-display">Questions, answered</h1>
        <p className="text-small text-muted md:text-body">Everything you need to know before your first class.</p>
      </div>
      <div className="flex flex-col gap-6 pb-14 md:flex-row md:gap-20 md:px-[220px] md:pb-30">
        <nav aria-label="FAQ categories" className="flex gap-2 overflow-x-auto px-5 scrollbar-none md:sticky md:top-20 md:w-[240px] md:shrink-0 md:flex-col md:gap-1 md:self-start md:px-0">
          {faqs.map((c, i) => (
            <a
              key={c.category}
              href={`#${slug(c.category)}`}
              className={`shrink-0 rounded-full px-3.5 py-[7px] text-small md:rounded-lg md:px-3.5 md:py-2.5 md:text-body ${i === 0 ? 'bg-black text-white md:bg-surface md:text-ink' : 'border border-line md:border-0 md:text-muted md:hover:text-ink'}`}
            >
              {c.category}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 flex-col gap-10 px-5 md:gap-14 md:px-0">
          {faqs.map((c, ci) => (
            <section key={c.category} id={slug(c.category)} className="flex scroll-mt-20 flex-col gap-2">
              <h2 className="text-h4 md:text-h3">{c.category}</h2>
              <div>
                {c.items.map((f, i) => (
                  <Accordion key={f.q} q={f.q} open={ci === 0 && i === 0}>
                    {f.a}
                  </Accordion>
                ))}
              </div>
            </section>
          ))}
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
            <div className="flex flex-col gap-1">
              <p className="text-h4">Still have a question?</p>
              <p className="text-small text-muted md:text-body">
                Call {MAIN_PHONE} or email {EMAIL}
              </p>
            </div>
            <ButtonLink href="/contact">Contact us</ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
