import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className='border-b'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <Link href='/' className='text-lg font-bold tracking-tight'>
          JobBoard
        </Link>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/'>Sign in</Link>
          </Button>
          <Button size='sm' asChild>
            <Link href='/'>Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
