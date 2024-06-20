import { Router } from "express";
import { tripService } from "../service";

export const tripRouter = Router();

tripRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const trip = await tripService.getTripById(id);

  res.json(trip);
});
