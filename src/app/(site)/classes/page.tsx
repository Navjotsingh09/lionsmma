import type { Metadata } from 'next';
import { ClassFilter } from '@/components/class-filter';
import { ButtonLink } from '@/components/ui';
import { heritage, values } from '@/data/site';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Muay Thai, women’s Muay Thai, Jiu-Jitsu, boxing, kids MMA and CrossFit — split by age and level, at Lions MMA clubs across the UK.',
};

export default function ClassesPage() {
  return (
    <>
      <div className="flex flex-col gap-3 px-5 pt-10 pb-2 md:items-center md:gap-4 md:px-10 md:pt-24 md:text-center">
        <p className="hidden text-small text-muted md:block">Classes</p>
        <h1 className="text-display-m md:text-display">
          Find the right class
          <br className="hidden md:block" /> for every age
        </h1>
        <p className="max-w-[620px] text-small text-muted md:text-body">Muay Thai, Jiu-Jitsu, boxing and MMA — split by age and level, and coached in a family atmosphere.</p>
      </div>

      <ClassFilter />

      <section className="flex flex-col gap-10 bg-black px-5 py-14 text-white md:gap-14 md:px-10 md:py-30">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-3.5">
            <p className="text-small text-white/60">Sikh martial heritage</p>
            <h2 className="text-h1-m md:text-h1">
              Self-defence runs
              <br className="hidden md:block" /> through Sikh history
            </h2>
          </div>
          <p className="max-w-[420px] text-small text-white/70 md:text-body">It is important for us as Sikhs to understand our history. We train to embrace the qualities our Gurus gave us — to whatever level suits you.</p>
        </div>
        <ol className="grid md:grid-cols-4">
          {heritage.map((h, i) => (
            <li key={h.name} className="flex flex-col gap-2 border-t border-white/20 pt-4 pb-6 md:gap-3.5 md:pt-6 md:pr-6">
              <span className="text-small text-white/50">0{i + 1}</span>
              <span className="text-lead md:text-h4">{h.name}</span>
              <span className="text-small text-white/70">{h.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col items-start gap-5 px-5 py-14 md:items-center md:gap-6 md:px-10 md:py-24">
        <h2 className="text-h4 md:text-h2">What every Lions MMA student brings</h2>
        <ul className="flex flex-wrap gap-2 md:justify-center md:gap-2.5">
          {values.map((v) => (
            <li key={v} className="rounded-full bg-surface px-4 py-2 text-small md:px-5.5 md:py-3 md:text-lead">
              {v}
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-col gap-2 pt-2 md:w-auto md:flex-row md:pt-4">
          <ButtonLink href="/book" size="l">
            Book a free class
          </ButtonLink>
          <ButtonLink href="/clubs" variant="outline" size="l">
            Find your club
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
