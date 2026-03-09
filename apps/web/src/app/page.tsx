import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'Modern office workspace',
    heading: 'Find your next workplace',
    body: 'Discover hundreds of companies hiring right now. From fast-growing startups to established enterprises — your next office is waiting.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Team collaborating',
    heading: 'Join great teams',
    body: 'Work alongside talented people who share your drive. Browse open roles across engineering, design, product, and more.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Professional at work',
    heading: 'Grow your career',
    body: 'Take the next step with confidence. Filter by salary, status, and company to find the role that fits your ambitions.',
  },
];

export default function Home() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-16'>
      <div className='flex flex-col items-center gap-6'>
        <h1 className='text-6xl font-bold tracking-tight md:text-7xl'>Job Board</h1>
        <p className='text-muted-foreground max-w-xl text-lg'>
          Browse companies and their open positions, or post a new job.
        </p>
        <Button asChild size='lg'>
          <Link href='/companies'>View Companies</Link>
        </Button>
      </div>

      <div className='mt-16 flex flex-col gap-16'>
        {photos.map(({ src, alt, heading, body }, index) => (
          <div
            key={alt}
            className={`flex flex-col items-center gap-8 md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className='group relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl md:w-1/2'>
              <Image
                src={src}
                alt={alt}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
            <div className='flex flex-col gap-4 md:w-1/2'>
              <h2 className='text-3xl font-bold tracking-tight'>{heading}</h2>
              <p className='text-muted-foreground text-lg leading-relaxed'>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
