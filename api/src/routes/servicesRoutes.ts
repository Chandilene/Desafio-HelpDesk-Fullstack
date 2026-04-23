import { Router } from "express";
import { ServicesController } from "@/controllers/ServicesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const servicesRoutes = Router();
const servicesController = new ServicesController();

servicesRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  servicesController.create,
);

servicesRoutes.get("/", ensureAuthenticated, servicesController.index);

servicesRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  servicesController.update,
);

export { servicesRoutes };
