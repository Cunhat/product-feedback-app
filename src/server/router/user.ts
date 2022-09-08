import { createRouter } from './context';
import { z } from 'zod';

export const userRouter = createRouter()
  .query('getAllUsers', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .query('getUserById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  });
