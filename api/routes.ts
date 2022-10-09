import { registerController } from "./controllers/auth/register.controller";
import { Controller } from "./interfaces";

export const routes = new Map<string, Controller>();
routes.set("POST:/api/register", registerController);
