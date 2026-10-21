import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col items-start gap-5 px-5 py-20 md:items-center md:py-36 md:text-center">
        <p className="text-small text-muted">Page not found</p>
        <h1 className="text-display-m md:text-display">We couldn’t find that page</h1>
        <p className="text-body text-muted">It may have moved. Try one of these instead.</p>
        <div className="flex flex-col gap-2 md:flex-row">
          <ButtonLink href="/" size="l">
            Home
          </ButtonLink>
          <ButtonLink href="/clubs" variant="outline" size="l">
            Find your club
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
