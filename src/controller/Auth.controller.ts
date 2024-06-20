import { Router } from "express";
import { authService } from "../service/Auth.service";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await authService.register(email, password, name);
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
