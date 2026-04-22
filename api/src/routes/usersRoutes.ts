import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.create,
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.index,
);

usersRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.update,
);

usersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.delete,
);

export { usersRoutes };
