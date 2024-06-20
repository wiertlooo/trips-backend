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

  //add new photo to a existing trip
  addPhoto: async (data: { tripId: number; userId: number; url: string }) => {
    return prisma.photo.create({
      data: {
        tripId: data.tripId,
        userId: data.userId,
        url: data.url,
      },
    });
  },

  //remove photo selected by photoId
  removePhoto: async (tripId: number, photoId: number) => {
    return prisma.photo.deleteMany({
      where: {
        id: photoId,
        tripId: tripId,
      },
    });
  },

  //update trip description
  updateDescription: async (tripId: number, description: string) => {
    return prisma.trip.update({
      where: { id: tripId },
      data: { description },
    });
  },

  //add new comment to a trip
  addComment: async (data: {
    tripId: number;
    userId: number;
    content: string;
  }) => {
    return prisma.comment.create({
      data: {
        tripId: data.tripId,
        userId: data.userId,
        content: data.content,
      },
    });
  },
};
