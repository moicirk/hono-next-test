import { z } from 'zod';

export const createApplicationValidator = z.object({
  name: z.string().min(1),
  email: z.email(),
  coverLetter: z.string().min(1),
});

export const updateApplicationValidator = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});
