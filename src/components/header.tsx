'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EMAIL, MAIN_PHONE, telHref } from '@/data/clubs';
import { nav } from '@/data/site';
import { GridIcon, Icon } from './icons';
import { Logo } from './logo';
import { ButtonLink, cx } from './ui';

function useScrolled(threshold = 120) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return scrolled;
}

function MenuButton({ onClick, dark }: { onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className={cx('grid place-items-center rounded-full transition-colors', dark ? 'size-11 bg-black/55 text-white glass hover:bg-black/70' : 'size-10 bg-black text-white hover:bg-ink/85')}
    >
      <GridIcon />
    </button>
  );
}

/** Floating dark pill — appears once you scroll, or from the start on photo-led pages. */
function Pill({ onMenu, visible }: { onMenu: () => void; visible: boolean }) {
  return (
    <div
      className={cx(
        'fixed inset-x-0 top-3 z-40 hidden justify-center transition-all duration-300 md:flex',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-7 rounded-full bg-black/55 py-2 pr-2 pl-7 text-small text-white/85 glass">
          {nav.slice(0, 4).map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link href="/" aria-label="Lions MMA home" className="px-3">
            <Logo width={60} color="white" />
          </Link>
          <Link href="/faqs" className="transition-colors hover:text-white">
            FAQs
          </Link>
          <ButtonLink href="/book" variant="white" className="!rounded-full !px-5 !py-2.5 !text-small">
            Book a free class
          </ButtonLink>
        </div>
        <MenuButton onClick={onMenu} dark />
      </div>
    </div>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cx('fixed inset-0 z-50 flex flex-col bg-white transition-opacity duration-200', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      inert={!open}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-10 md:py-4">
        <Link href="/" onClick={onClose} aria-label="Lions MMA home">
          <Logo width={64} />
        </Link>
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-9 place-items-center rounded-full bg-surface">
          <Icon name="x" size={18} />
        </button>
      </div>
      <nav className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col overflow-y-auto px-5 pt-6 md:px-10 md:pt-16">
        {[{ href: '/book', label: 'Book a free class' }, ...nav, { href: '/volunteer', label: 'Volunteer' }, { href: '/donate', label: 'Donate' }, { href: '/contact', label: 'Contact' }].map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose} className="group flex items-center justify-between border-b border-line py-3 text-h1-m md:text-h2">
            {l.label}
            <Icon name="chevronRight" size={22} className="text-muted transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 py-6 text-small text-muted">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={telHref(MAIN_PHONE)}>{MAIN_PHONE}</a>
        </div>
      </nav>
    </div>
  );
}

export function Header({ variant = 'bar' }: { variant?: 'bar' | 'overlay' }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const close = () => setOpen(false);

  return (
    <>
      {variant === 'bar' ? (
        <header className="sticky top-0 z-30 bg-white md:static">
          {/* Desktop */}
          <div className="hidden h-[76px] grid-cols-[1fr_auto_1fr] items-center px-10 md:grid">
            <nav aria-label="Main" className="flex items-center gap-7 text-small">
              {nav.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-muted">
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/" aria-label="Lions MMA home">
              <Logo width={92} />
            </Link>
            <div className="flex items-center justify-end gap-4">
              <ButtonLink href="/book">Book a free class</ButtonLink>
              <MenuButton onClick={() => setOpen(true)} />
            </div>
          </div>
          {/* Mobile */}
          <div className="flex h-[60px] items-center justify-between px-4 md:hidden">
            <Link href="/" aria-label="Lions MMA home">
              <Logo width={56} />
            </Link>
            <div className="flex items-center gap-2">
              <ButtonLink href="/book">Free class</ButtonLink>
              <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-9 place-items-center rounded-full bg-surface">
                <GridIcon />
              </button>
            </div>
          </div>
        </header>
      ) : (
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 md:hidden">
          <Link href="/" aria-label="Lions MMA home">
            <Logo width={56} color="white" />
          </Link>
          <div className="flex items-center gap-2">
            <ButtonLink href="/book" variant="white">
              Free class
            </ButtonLink>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-9 place-items-center rounded-full bg-black/55 text-white glass">
              <GridIcon />
            </button>
          </div>
        </header>
      )}
      <Pill onMenu={() => setOpen(true)} visible={variant === 'overlay' || scrolled} />
      <Menu open={open} onClose={close} />
    </>
  );
}
