import { Request, Response, NextFunction } from "express";
import { authService } from "../service/Auth.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};
