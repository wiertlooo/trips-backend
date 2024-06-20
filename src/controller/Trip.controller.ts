import { Router } from "express";
import { tripService } from "../service";

export const tripRouter = Router();

tripRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const trip = await tripService.getTripById(id);

  res.json(trip);
});

tripRouter.get("/user/:userId", async (req, res) => {
  const userId = +req.params.userId;

  const trips = await tripService.getTripsByUserId(userId);

  res.json(trips);
});

tripRouter.post("/", async (req, res) => {
  const { title, description, creatorId } = req.body;
  try {
    const newTrip = await tripService.createTrip({
      title,
      description,
      creatorId,
    });
    res.status(201).json(newTrip);
  } catch (e) {
    res.status(500);
  }
});
