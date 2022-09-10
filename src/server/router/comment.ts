import { createRouter } from './context';
import { z } from 'zod';

export const commentRouter = createRouter()
  .query('getAllComments', {
    async resolve({ ctx }) {
      return await ctx.prisma.comment.findMany({
        include: {
          user: true,
          parent: {
            include: {
              user: true,
            },
          },
          replies: {
            include: {
              parent: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    },
  })
  .query('getCommentById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          parent: {
            include: {
              user: true,
            },
          },
          replies: {
            include: {
              parent: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    },
  });
