import express from "express";
import MyUserControler from "../controllers/MyUserControler";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/my/user
router.get("/", jwtCheck, jwtParse, MyUserControler.getCurrentUser);
router.post("/", jwtCheck, MyUserControler.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserControler.updateCurrentUser
);

export default router;