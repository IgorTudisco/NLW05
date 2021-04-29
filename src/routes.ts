// Responsible for routes
// Export all methods

import { Router } from "express";

// Importing controller

import { SettingController } from "./Controller/SettingController";
import { UserController } from "./Controller/UserController";
import { MessageController } from "./Controller/MessageController";

const routes = Router();

/*
    Types of parameters

    Routes Params => Parameters of rotes
    ex: http://localhost:3333/settings/1
    Query Params => Parameters of Filters and search
    ex: http://localhost:3333/settings/1?search=somethings
    Body Params (Parameters of our response.) => {
        type json.
        here we pass some object.
    } 
*/

// Instantiating Controller

const settingController = new SettingController();
const userController = new UserController();
const messageController = new MessageController();

// Routes page 

routes.post("/settings", settingController.create);
routes.get("/settings:username", settingController.findByUsername);
routes.put("/settings/:username", settingController.update);

routes.post("/users", userController.create);

routes.post("/messages", messageController.create);
routes.get("/messages/:id", messageController.showByUser);

export { routes };