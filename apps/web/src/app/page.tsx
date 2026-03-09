import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <div className='container flex flex-col items-center justify-center gap-6 px-4 md:px-6'>
        <h1 className='text-center text-4xl font-bold tracking-tight md:text-5xl'>Job Board</h1>
        <p className='text-muted-foreground max-w-xl text-center text-lg'>
          Browse companies and their open positions, or post a new job.
        </p>
        <Button asChild size='lg'>
          <Link href='/companies'>View Companies</Link>
        </Button>
      </div>
    </main>
  );
}