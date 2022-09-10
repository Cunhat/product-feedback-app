// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

export const getCommentById = async (id: string) => {
  return await prisma.productRequest.findUnique({
    where: {
      id: id,
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
              user: true,
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
};
