import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string("Fullname must be provided").max(255),
    email: z.email("Invalid email format").max(255),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(255),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format").max(255),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(255),
  }),
});
