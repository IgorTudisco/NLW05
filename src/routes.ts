import { Router } from "express";
import { MessagesController } from "./Controller/MessageController";
import { SettingsController } from "./Controller/SettingController";
import { UserController } from "./Controller/UserController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UserController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

export { routes };
