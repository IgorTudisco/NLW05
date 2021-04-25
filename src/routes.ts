// Responsible for routes
// Export all methods

import { Router } from "express";

// Importing controller

import { SettingsController } from "./Controller/SettingsController";
import { UsersController } from "./Controller/UserController";
import { MessagesController } from "./Controller/MessageController";

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

const settingsController = new SettingsController();
const usersController = new UsersController();
const messageController = new MessagesController();

// Routes page 

routes.post("/settings", settingsController.create);

routes.post("/users", usersController.create);

routes.post("/messages", messageController.create);
routes.get("/messages/:id", messageController.showByUser);

export { routes };