import type { Metadata } from 'next';
import Image from 'next/image';
import { EnquiryForm } from '@/components/enquiry-form';
import { Icon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Volunteer for #ABetterPunjab. Whatever your field of work or skills, help Lions MMA reach and support thousands of children in Punjab.',
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col md:flex-row md:gap-16 md:pr-10 md:pb-30 md:pl-2">
      <div className="px-2 md:w-[640px] md:shrink-0 md:px-0">
        <div className="relative h-[300px] overflow-hidden rounded-[14px] md:sticky md:top-2 md:h-[calc(100svh-16px)] md:max-h-[900px] md:rounded-2xl">
          <Image src="/photos/fun-run.jpg" alt="Families in orange T-shirts on a charity fun run" fill preload sizes="(min-width: 768px) 640px, 100vw" className="object-cover" />
          <div className="absolute inset-x-10 bottom-10 hidden flex-col gap-1.5 rounded-xl bg-black/35 px-[18px] py-4 text-white glass md:flex">
            <span className="text-small text-white/80">Fun Run/Walk</span>
            <span className="text-lead">Two successful years of fun runs funded our first camps in Punjab.</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-5 pt-8 pb-14 md:max-w-[600px] md:gap-6 md:px-0 md:pt-16">
        <p className="flex items-center gap-2 text-small">
          <Icon name="heart" size={14} /> #ABetterPunjab
        </p>
        <h1 className="text-display-m md:text-display">
          Volunteer for a<br className="hidden md:block" /> better Punjab
        </h1>
        <p className="text-small text-muted md:text-body">
          We’re looking for volunteers who can help us reach and support thousands of children in Punjab. Whatever your field of work or skills, there is something we can all do. We plan to reach over 5,000 children next year.
        </p>
        <EnquiryForm kind="volunteer" />
      </div>
    </div>
  );
}
