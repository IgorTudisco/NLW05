
// Import req and res

import { Request, Response } from "express";

// Import getCustomRepository

import { getCustomRepository } from "typeorm";

// Import SettingsRepository

import { SettingsRepository } from "../repositories/SettingsRepositories"

// Class responsible for create and save the data in DB.

class SenttingsController {

    // Pass my types

    async create(request: Request, response: Response){
        
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

    }

};

export { SenttingsController };


// embuscadoproximonivel