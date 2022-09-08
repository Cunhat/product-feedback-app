import { createRouter } from './context';
import { z } from 'zod';

export const statusRouter = createRouter().query('getAllStatus', {
  async resolve({ ctx }) {
    return await ctx.prisma.status.findMany({ include: { productRequest: true } });
  },
});
