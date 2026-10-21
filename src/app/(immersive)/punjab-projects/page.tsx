import type { Metadata } from 'next';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { ButtonLink } from '@/components/ui';
import { helpText, punjabDone, punjabNext } from '@/data/site';

export const metadata: Metadata = {
  title: 'Punjab projects',
  description: 'Lions MMA community projects tackling drug and alcohol abuse in Punjab — awareness camps in 52 schools, free martial arts and our first gym. #ABetterPunjab',
};

export default function PunjabPage() {
  return (
    <>
      <section className="relative flex h-[640px] items-end overflow-hidden bg-black text-white md:h-[860px]">
        <Image src="https://images.pexels.com/photos/6005463/pexels-photo-6005463.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="A Sikh coach demonstrating a guard stance to rows of school children in Punjab" fill preload sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.75) 25%, rgba(0,0,0,0) 65%)' }} />
        <div className="relative flex max-w-[880px] flex-col gap-4 p-5 md:gap-[18px] md:px-12 md:pb-14">
          <p className="flex items-center gap-2 text-small">
            <Icon name="heart" size={14} /> #ABetterPunjab
          </p>
          <h1 className="text-display-m md:text-display">Inspiring and empowering the youth for a better Punjab</h1>
          <p className="max-w-[560px] text-small text-white/85 md:text-body">Community projects tackling the causes of drug and alcohol abuse in Punjab — with Sikhi, martial arts and awareness camps in schools.</p>
          <div className="flex flex-col gap-2 pt-2 md:flex-row">
            <ButtonLink href="/donate" variant="white" size="l">
              Donate
            </ButtonLink>
            <ButtonLink href="/volunteer" variant="glass" size="l">
              Volunteer
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 px-5 pt-12 pb-10 md:flex-row md:gap-20 md:pt-30 md:pr-10 md:pb-24 md:pl-[220px]">
        <div className="flex flex-col gap-3.5 md:w-[400px] md:shrink-0">
          <p className="text-small text-muted">So far</p>
          <h2 className="text-h1-m md:text-h1">
            What we’ve
            <br className="hidden md:block" /> managed to do
          </h2>
          <p className="text-small text-muted md:max-w-[380px] md:text-body">After two successful years of the Fun Run/Walk, the Lions MMA team visited Punjab to run Sikhi, MMA and drug & alcohol awareness camps at schools.</p>
        </div>
        <ol className="flex flex-col md:w-[560px]">
          {punjabDone.map((d, i) => (
            <li key={d} className="flex items-center gap-4 border-t border-line py-3.5 first:border-t md:gap-5 md:py-5 md:first:border-t-0">
              <span className="text-tiny text-muted md:text-small">0{i + 1}</span>
              <span className="text-body md:text-h4">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-2.5 px-2 md:grid-cols-4">
        <div className="relative h-[260px] overflow-hidden rounded-xl md:col-span-2 md:h-[420px]">
          <Image src="https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Teenagers training with a Sikh coach in a small gym in Punjab" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="relative hidden h-[420px] overflow-hidden rounded-xl md:block">
          <Image src="https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Families in orange T-shirts on a charity fun run" fill sizes="25vw" className="object-cover" />
        </div>
        <div className="relative hidden h-[420px] overflow-hidden rounded-xl md:block">
          <Image src="https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Children practising martial arts on mats" fill sizes="25vw" className="object-cover" />
        </div>
      </div>

      <section className="flex flex-col gap-8 px-5 py-12 md:gap-12 md:px-10 md:py-30">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-3.5">
            <p className="text-small text-muted">What next</p>
            <h2 className="text-display-m md:text-display">5,000 children next year</h2>
          </div>
          <p className="max-w-[380px] text-small text-muted md:text-body">That’s our goal — along with full-time support for children dealing with substance abuse.</p>
        </div>
        <ol className="grid gap-2.5 md:grid-cols-4 md:gap-4">
          {punjabNext.map((n, i) => (
            <li key={n} className="flex gap-3.5 rounded-xl bg-surface p-4.5 md:flex-col md:gap-12 md:rounded-2xl md:p-6">
              <span className="text-small text-muted">0{i + 1}</span>
              <span className="text-body md:text-h4">{n}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="px-2 pb-2">
        <section className="relative flex min-h-[520px] items-end overflow-hidden rounded-2xl bg-black text-white md:h-[600px] md:items-center">
          <Image src="https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" fill sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,0) 80%)' }} />
          <div aria-hidden="true" className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.7) 50%, rgba(0,0,0,.1) 100%)' }} />
          <div className="relative flex max-w-[560px] flex-col gap-4 p-5 md:gap-[18px] md:p-12">
            <p className="text-small text-white/85">Can you help?</p>
            <h2 className="text-display-m md:text-display">
              We now need
              <br className="hidden md:block" /> your support
            </h2>
            <p className="text-small text-white/85 md:text-body">{helpText}</p>
            <div className="flex flex-col gap-2 pt-2 md:flex-row">
              <ButtonLink href="/donate" variant="white" size="l">
                Donate
              </ButtonLink>
              <ButtonLink href="/volunteer" variant="glass" size="l">
                Volunteer
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
