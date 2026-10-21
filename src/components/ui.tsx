import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon } from './icons';

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

type Variant = 'black' | 'white' | 'glass' | 'outline';
type Size = 'm' | 'l';

const variants: Record<Variant, string> = {
  black: 'bg-black text-white hover:bg-ink/85',
  white: 'bg-white text-ink hover:bg-white/85',
  glass: 'bg-black/35 text-white glass hover:bg-black/50',
  outline: 'border border-line text-ink hover:bg-surface',
};
const sizes: Record<Size, string> = { m: 'px-5 py-2.5 text-small', l: 'px-5 py-3.5 text-body' };

export function buttonClass(variant: Variant = 'black', size: Size = 'm', full = false) {
  return cx(
    'inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-colors disabled:opacity-40 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    full && 'w-full',
  );
}

export function ButtonLink({ href, variant, size, full, className, children, ...rest }: { href: string; variant?: Variant; size?: Size; full?: boolean } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link href={href} className={cx(buttonClass(variant, size, full), className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, full, className, ...rest }: { variant?: Variant; size?: Size; full?: boolean } & ComponentProps<'button'>) {
  return <button className={cx(buttonClass(variant, size, full), className)} {...rest} />;
}

export function Check({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-small">
      <span className={cx('grid size-[18px] shrink-0 place-items-center rounded-full', tone === 'dark' ? 'bg-ink text-white' : 'bg-white text-ink')}>
        <Icon name="check" size={12} strokeWidth={2.5} />
      </span>
      <span className={tone === 'dark' ? 'text-ink' : 'text-white'}>{children}</span>
    </span>
  );
}

/** Native details/summary accordion — works without JavaScript. */
export function Accordion({ q, children, open, dark, size = 'lead' }: { q: string; children: ReactNode; open?: boolean; dark?: boolean; size?: 'lead' | 'body' }) {
  if (dark) {
    return (
      <details className="group w-full max-w-[340px] rounded-md bg-black/45 glass text-white" open={open}>
        <summary className="flex cursor-pointer items-center gap-4 py-2 pr-2 pl-3.5 text-small">
          <span className="flex-1">{q}</span>
          <span className="grid size-[22px] place-items-center rounded bg-white/15">
            <Icon name="plus" size={14} className="transition-transform group-open:rotate-45" />
          </span>
        </summary>
        <p className="px-3.5 pb-3 text-small text-white/80">{children}</p>
      </details>
    );
  }
  return (
    <details className="group border-b border-line" open={open}>
      <summary className={cx('flex cursor-pointer items-center gap-4 py-5', size === 'lead' ? 'text-lead' : 'text-body')}>
        <span className="flex-1">{q}</span>
        <Icon name="plus" size={18} className="shrink-0 transition-transform group-open:rotate-45" />
      </summary>
      <div className="-mt-1 pb-5 text-body text-muted">{children}</div>
    </details>
  );
}

export function Tag({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <span className={cx('inline-flex rounded px-2 py-0.5 text-tiny', dark ? 'bg-black text-white' : 'bg-surface text-ink')}>{children}</span>;
}

export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={cx('text-small', light ? 'text-white/70' : 'text-muted', className)}>{children}</p>;
}

/** Image that covers its (relative) parent. */
export function Cover({ src, alt, sizes, preload, className }: { src: string; alt: string; sizes: string; preload?: boolean; className?: string }) {
  return <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cx('object-cover', className)} />;
}

export function Shade({ dir = 'lr', strength = 0.8, className }: { dir?: 'lr' | 'bt'; strength?: number; className?: string }) {
  const bg =
    dir === 'lr'
      ? `linear-gradient(90deg, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength * 0.6}) 35%, rgba(0,0,0,0) 70%)`
      : `linear-gradient(0deg, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength * 0.5}) 45%, rgba(0,0,0,0) 100%)`;
  return <div aria-hidden="true" className={cx('pointer-events-none absolute inset-0', className)} style={{ background: bg }} />;
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-small">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {i > 0 && <Icon name="chevronRight" size={12} className="text-muted" />}
          {it.href ? (
            <Link href={it.href} className="text-muted hover:text-ink">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
