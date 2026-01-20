import { Router } from "express";
import { addMember, create, listProjectMembers } from "./project.controller";
import authMiddleware from "./../../middlewares/auth.middleware";
import { validate } from "./../../middlewares/validation.middleware";
import { addMemberSchema, createSchema } from "./project.schema";

const router = Router();

router.post("/create", authMiddleware, validate(createSchema), create);
router.post(
  "/add-member",
  authMiddleware,
  validate(addMemberSchema),
  addMember
);
router.get("/:id/members", authMiddleware, listProjectMembers);

export default router;
