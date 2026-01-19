import { Router } from "express";
import { login, register } from "./auth.controller";
import { validate } from "../../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import { authLimiter } from "./../../middlewares/rateLimit.middleware";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/register", authLimiter, validate(registerSchema), register);

export default router;
