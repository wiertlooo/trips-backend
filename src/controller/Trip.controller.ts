import { Router } from "express";
import { tripService } from "../service";

export const tripRouter = Router();

//get trip by id
tripRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const trip = await tripService.getTripById(id);

  res.json(trip);
});

//get userposts endpoints
tripRouter.get("/user/:userId", async (req, res) => {
  const userId = +req.user!.userId;

  const trips = await tripService.getTripsByUserId(userId);

  res.json(trips);
});

//create new trip endpoint
tripRouter.post("/", async (req, res) => {
  const { title, description } = req.body;
  const creatorId = req.user!.userId;
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
