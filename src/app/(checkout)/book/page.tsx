import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BookForm } from '@/components/book-form';

export const metadata: Metadata = {
  title: 'Book a free class',
  description: 'Choose your club and class, leave your details, and come and try Lions MMA for free.',
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="mx-auto h-[70vh] max-w-[1100px] animate-pulse px-5 py-10 md:px-10" aria-busy="true" />}>
      <BookForm />
    </Suspense>
  );
}
