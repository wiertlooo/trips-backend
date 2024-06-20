import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tripService = {
  getTripById: async (id: number) => {
    return prisma.trip.findUnique({ where: { id } });
  },
  getTripsByUserId: async (userId: number) => {
    return prisma.trip.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },
    });
  },
};
