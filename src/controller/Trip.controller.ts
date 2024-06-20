import { Router } from "express";
import { tripService } from "../service";
import { authMiddleware } from "../middleware/authMiddleware";

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

//add new photo to a trip
tripRouter.post("/:id/photos", authMiddleware, async (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const { url } = req.body;
  const userId = req.user!.userId;
  try {
    const newPhoto = await tripService.addPhoto({ tripId, userId, url });
    res.status(201).json(newPhoto);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

//delete existing photo by photoId
tripRouter.delete(
  "/:tripId/photos/:photoId",
  authMiddleware,
  async (req, res) => {
    const tripId = parseInt(req.params.tripId, 10);
    const photoId = parseInt(req.params.photoId, 10);
    try {
      await tripService.removePhoto(tripId, photoId);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
);

//update trip description
tripRouter.patch("/:id", authMiddleware, async (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const { description } = req.body;
  try {
    const updatedTrip = await tripService.updateDescription(
      tripId,
      description
    );
    res.status(200).json(updatedTrip);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

//add new comment to a trip
tripRouter.post("/:id/comments", authMiddleware, async (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const { content } = req.body;
  const userId = req.user!.userId;
  try {
    const newComment = await tripService.addComment({
      tripId,
      userId,
      content,
    });
    res.status(201).json(newComment);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
