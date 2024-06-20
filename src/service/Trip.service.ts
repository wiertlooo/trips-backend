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
  createTrip: async (data: {
    title: string;
    description?: string;
    creatorId: number;
  }) => {
    return prisma.trip.create({
      data: {
        title: data.title,
        description: data.description,
        creatorId: data.creatorId,
      },
    });
  },
};
