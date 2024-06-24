import "dotenv/config";
import express from "express";
import { tripRouter } from "./controller";
import { authRouter } from "./controller/Auth.controller";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", async (req, res, next) => {
  res.sendStatus(200);
});

app.use("/trips", tripRouter);
app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("App listening on the port 3000");
});
