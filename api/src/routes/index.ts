import { Router } from "express";
import { sessionsRoutes } from "./sessionsRoutes";
import { usersRoutes } from "./usersRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

export { routes };
