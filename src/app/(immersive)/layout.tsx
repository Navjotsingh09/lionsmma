import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

/** Pages that open on a full-bleed photo: the floating pill nav sits on top. */
export default function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header variant="overlay" />
      <main id="main" className="relative flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
