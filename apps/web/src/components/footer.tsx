import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socials = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Github, label: 'GitHub' },
  { icon: Instagram, label: 'Instagram' },
];

const links = [{ label: 'Terms & Conditions' }, { label: 'Privacy' }, { label: 'Cookies' }, { label: 'Security' }];

export function Footer() {
  return (
    <footer className='bg-foreground text-background mt-auto'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col gap-3'>
            <Link href='/' className='text-sm font-bold tracking-tight'>
              JobBoard
            </Link>
            <div className='flex items-center gap-3'>
              {socials.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href='/'
                  aria-label={label}
                  className='text-background/60 hover:text-background transition-colors'
                >
                  <Icon className='h-4 w-4' />
                </Link>
              ))}
            </div>
          </div>

          <nav className='flex flex-wrap gap-x-5 gap-y-2'>
            {links.map(({ label }) => (
              <Link key={label} href='/' className='text-background/60 hover:text-background text-sm transition-colors'>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className='border-background/20 mt-6 border-t pt-6'>
          <p className='text-background/40 text-xs'>&copy; 2026 JobBoard</p>
        </div>
      </div>
    </footer>
  );
}
