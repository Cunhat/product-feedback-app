import { createRouter } from './context';
import { z } from 'zod';

export const productRequestRouter = createRouter()
  .query('getAllProductRequests', {
    async resolve({ ctx }) {
      return await ctx.prisma.productRequest.findMany({
        include: { category: true, status: true, user: true, comments: true },
      });
    },
  })
  .query('getProductRequestsById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.productRequest.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
          status: true,
          user: true,
          comments: {
            include: {
              user: true,
              replies: true
            },
          },
        },
      });
    },
  });
