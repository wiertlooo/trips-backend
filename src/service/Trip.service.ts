import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tripService = {
  //get trip by id
  getTripById: async (id: number) => {
    return prisma.trip.findUnique({ where: { id } });
  },
  //get users trips
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
  //createTrip service
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
