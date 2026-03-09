import { z } from 'zod';

export const jobStatusEnum = z.enum(['draft', 'open', 'in_review', 'filled', 'closed']);

export const createJobValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priceFrom: z.number().int().nonnegative(),
  priceTo: z.number().int().nonnegative(),
  status: jobStatusEnum.default('draft'),
});

export const updateJobValidator = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  priceFrom: z.number().int().nonnegative().optional(),
  priceTo: z.number().int().nonnegative().optional(),
  status: jobStatusEnum.optional(),
});
