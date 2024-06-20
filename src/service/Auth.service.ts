import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/AuthPayload";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const authService = {
  register: async (email: string, password: string, name: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user;
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token, user };
  },

  verifyToken: (token: string): AuthPayload => {
    try {
      return jwt.verify(token, SECRET_KEY) as AuthPayload;
    } catch (e) {
      throw new Error("Invalid token");
    }
  },
};
