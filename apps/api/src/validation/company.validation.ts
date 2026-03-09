import { z } from 'zod';

export const createCompanyValidator = z.object({ name: z.string().min(1) });
export const updateCompanyValidator = z.object({ name: z.string().min(1) });
