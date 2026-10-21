import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lionsmma.net'),
  title: {
    default: 'Lions MMA & Boxing — Sikhi-based martial arts since 2010',
    template: '%s · Lions MMA & Boxing',
  },
  description:
    'Muay Thai, Jiu-Jitsu, boxing and MMA for kids and adults, run from Gurdwaras across the UK since 2010. Book a free class at one of our nine clubs.',
  openGraph: {
    type: 'website',
    siteName: 'Lions MMA & Boxing',
    locale: 'en_GB',
    images: [{ url: 'https://images.pexels.com/photos/8745178/pexels-photo-8745178.jpeg?auto=compress&cs=tinysrgb&w=1600', width: 1376, height: 768, alt: 'Lions MMA' }],
  },
};

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-[60] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
