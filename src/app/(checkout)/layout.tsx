import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Logo } from '@/components/logo';
import { MAIN_PHONE, telHref } from '@/data/clubs';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line px-4 py-3 md:px-10 md:py-4">
        <Link href="/clubs" className="flex items-center gap-1.5 text-small">
          <Icon name="chevronLeft" size={16} /> Back
        </Link>
        <Link href="/" aria-label="Lions MMA home">
          <Logo width={64} className="md:w-[72px]" />
        </Link>
        <a href={telHref(MAIN_PHONE)} className="justify-self-end text-small text-muted">
          <span className="hidden md:inline">Need help? </span>
          {MAIN_PHONE}
        </a>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
