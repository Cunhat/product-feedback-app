import { createRouter } from './context';
import { z } from 'zod';

export const categoryRouter = createRouter().query('getAllCategories', {
  async resolve({ ctx }) {
    return await ctx.prisma.category.findMany();
  },
});
