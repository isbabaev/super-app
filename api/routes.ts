import { registerHandler } from "./handlers/auth/register.handler";
import { Handler } from "./interfaces";

export const routes = new Map<string, Handler>();
routes.set("POST:/api/register", registerHandler);
