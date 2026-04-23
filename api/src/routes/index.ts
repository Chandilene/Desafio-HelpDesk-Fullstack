import { Router } from "express";
import { sessionsRoutes } from "./sessionsRoutes";
import { usersRoutes } from "./usersRoutes";
import { servicesRoutes } from "./servicesRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/services", servicesRoutes);

export { routes };
