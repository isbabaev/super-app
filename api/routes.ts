import { AuthController } from "./controllers/auth.controller";
import { Controller } from "./interfaces";

export const routes = new Map<string, any>();

const authController = new AuthController();

routes.set("POST:/api/register", authController.register);
