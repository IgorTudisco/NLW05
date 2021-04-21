// Responsible for routes
// Export all methods

import { Router } from "express";

// Importing controller

import { SenttingsController } from "./Controller/SenttingsController"

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

// Instantiating SenttingsController

const senttingsController = new SenttingsController();

routes.post("/settings", senttingsController.create);

export { routes };