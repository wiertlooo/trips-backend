import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tripService = {
  getTripById: async (id: number) => {
    return prisma.trip.findUnique({ where: { id } });
  },
};
