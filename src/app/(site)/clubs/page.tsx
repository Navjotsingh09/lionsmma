import type { Metadata } from 'next';
import { ClubFinder } from '@/components/club-finder';
import { Breadcrumb, ButtonLink } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Find your club',
  description: 'Nine Lions MMA clubs across the UK, all run from Gurdwara premises — Bradford, Capehill Smethwick, Gravesend, Hitchin, Huddersfield, Leicester, Willenhall, Wolverhampton and Tividale.',
};

export default function ClubsPage() {
  return (
    <>
      <div className="flex flex-col gap-4 px-5 pt-8 pb-4 md:gap-6 md:px-10 md:pt-18 md:pb-2">
        <div className="hidden md:block">
          <Breadcrumb items={[{ href: '/clubs', label: 'Clubs' }, { label: 'United Kingdom' }]} />
        </div>
        <div className="flex flex-col gap-3 md:gap-3.5">
          <h1 className="text-display-m md:text-display">Find your club</h1>
          <p className="max-w-[460px] text-small text-muted md:text-body">Nine clubs, all run from Gurdwara premises. Your first class at any of them is free.</p>
        </div>
      </div>
      <ClubFinder />
      <div className="px-5 py-14 md:px-10 md:pt-24 md:pb-30">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 md:flex-row md:items-center md:justify-between md:px-12 md:py-10">
          <div className="flex max-w-[560px] flex-col gap-2">
            <h2 className="text-h4 md:text-h3">No club near you yet?</h2>
            <p className="text-small text-muted md:text-body">We work with Sevadaars across the UK. Ask your Gurdwara committee to get in touch about starting a Lions MMA club.</p>
          </div>
          <ButtonLink href="/contact" variant="outline" size="l">
            Get in touch
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
