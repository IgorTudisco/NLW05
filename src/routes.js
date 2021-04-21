// Responsible for routes
// Export all methods

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "./repositories/SettingsRepositories";

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

routes.post("/settings", async (request, response) => {

    // Get our response.body

    const { chat, username } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    // For to creating something in a table, We need to stepping

    // One stepping

    const settings = settingsRepository.create({
        chat,
        username
    });

    // Second

    await settingsRepository.save(settings);


    return response.json(settings);

});

export { routes };