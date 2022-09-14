// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};
