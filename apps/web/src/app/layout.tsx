import '@/app/globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobBoard',
  description: 'Browse companies and their open positions, or post a new job.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col'>
        <Header />
        <div className='flex-1'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
