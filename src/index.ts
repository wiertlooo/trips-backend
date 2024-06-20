import "dotenv/config";
import express from "express";
import { tripRouter } from "./controller";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  res.sendStatus(200);
});

app.use("/trips", tripRouter);

app.listen(3000, () => {
  console.log("App listening on the port 3000");
});
