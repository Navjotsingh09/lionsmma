import type { Metadata } from 'next';
import { EMAIL } from '@/data/clubs';

export const metadata: Metadata = { title: 'Terms', robots: { index: false } };

// DRAFT — the club needs to review this before launch.
export default function TermsPage() {
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-5 px-5 py-12 md:py-24 [&_h2]:pt-4 [&_h2]:text-h4 [&_p]:text-body [&_p]:text-muted">
      <h1 className="text-display-m md:text-h1">Terms</h1>
      <p>These terms cover using this website and booking a free class with Lions MMA.</p>
      <h2>Free classes</h2>
      <p>Booking a free class reserves a place for one person. The club will confirm your place. Please let us know if you can’t make it.</p>
      <h2>Training safely</h2>
      <p>Martial arts are physical. Tell your coach about any injuries or health conditions before training, and follow their instructions. A parent or guardian must book for anyone under 18.</p>
      <h2>Timetables</h2>
      <p>Class times can change. We’ll keep the timetables on this site up to date, but please check with your club if you’re unsure.</p>
      <h2>Questions</h2>
      <p>
        Email <a className="text-ink underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </article>
  );
}
