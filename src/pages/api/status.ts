import { prisma } from '../../server/db/client';

export const getAllStatus = async () => {
  return await prisma.status.findMany();
};
