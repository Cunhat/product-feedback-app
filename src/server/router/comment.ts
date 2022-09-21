import { createRouter } from './context';
import { z } from 'zod';
import { resolve } from 'path';

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
              user: true,
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
  })
  .mutation('createComment', {
    input: z.object({
      content: z.string().min(1),
      productId: z.string(),
      parentId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.comment.create({
        data: {
          //productRequestId: input.productId,
          content: input.content,
          user: {
            connect: {
              id: 'cl7t3e5ew0019x4wddqmz9fs7', //TODO: get user id from session
            },
          },
          ProductRequest: {
            connect: {
              id: input.productId,
            },
          },
          ...(input.parentId && {
            parent: {
              connect: {
                id: input.parentId,
              },
            },
          }),
        },
      });
    },
  });
