import type { Metadata } from 'next';
import { EMAIL } from '@/data/clubs';

export const metadata: Metadata = { title: 'Privacy', robots: { index: false } };

// DRAFT — the club needs to review this before launch.
export default function PrivacyPage() {
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-5 px-5 py-12 md:py-24 [&_h2]:pt-4 [&_h2]:text-h4 [&_p]:text-body [&_p]:text-muted">
      <h1 className="text-display-m md:text-h1">Privacy</h1>
      <p>This notice explains what Lions MMA does with the details you give us on this website.</p>
      <h2>What we collect</h2>
      <p>When you book a free class, volunteer or contact us, we collect the details you type into the form: names, contact details, a child’s first name and age, and anything you choose to tell us about health or injuries.</p>
      <h2>Why we use it</h2>
      <p>Only to arrange your class, reply to your message or organise volunteering. We don’t sell your details or use them for advertising.</p>
      <h2>Who sees it</h2>
      <p>The Lions MMA team and the coaches at the club you chose. Messages are sent by email through our email provider.</p>
      <h2>How long we keep it</h2>
      <p>For as long as we need it to arrange your training or reply to you, and then we delete it.</p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your details at any time. Email <a className="text-ink underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>. You can also complain to the Information Commissioner’s Office (ico.org.uk).
      </p>
    </article>
  );
}
