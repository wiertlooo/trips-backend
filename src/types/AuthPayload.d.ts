import { Role } from "@prisma/client";

export interface AuthPayload {
  userId: number;
  role: Role;
}
