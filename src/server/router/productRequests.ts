import { createRouter } from './context';
import { z } from 'zod';

export const productRequestRouter = createRouter()
  .query('getAllProductRequests', {
    async resolve({ ctx }) {
      return await ctx.prisma.productRequest.findMany({
        include: {
          category: true,
          status: true,
          user: true,
          comments: {
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
          },
        },
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
          comments: true,
        },
      });
    },
  })
  .mutation('createProductRequest', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      categoryId: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const statusId = await ctx.prisma.status.findUnique({
        where: {
          name: 'Planned',
        },
      });

      if (statusId === null) throw new Error('Failed to find two pokemon');

      return await ctx.prisma.productRequest.create({
        data: {
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          userId: input.userId,
          statusId: statusId.id,
          upVotes: 0,
        },
      });
    },
  })
  .mutation('upVote', {
    input: z.object({
      id: z.string(),
      upVotes: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.productRequest.update({
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
          },
        },
        data: {
          upVotes: input.upVotes,
        },
      });
    },
  })
  .mutation('updateProductRequest', {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      categoryId: z.string(),
      statusId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.productRequest.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          statusId: input.statusId,
        },
      });
    },
  })
  .mutation('deleteProductRequest', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.productRequest.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
