import { LOGO_PATH } from './logo-path';

const COLORS = { orange: '#FE6700', black: '#141210', white: '#FFFFFF' } as const;

export function Logo({ width = 80, color = 'black', className }: { width?: number; color?: keyof typeof COLORS; className?: string }) {
  return (
    <svg viewBox="2 2 596 351" width={width} height={(width * 351) / 596} className={className} role="img" aria-label="Lions MMA & Boxing">
      <path d={LOGO_PATH} fill={COLORS[color]} fillRule="evenodd" />
    </svg>
  );
}
