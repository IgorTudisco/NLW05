
// Import req and res

import { Request, Response } from "express";

// Importing services

import { SettingsService } from "../services/SettingsServices"

// Class responsible for create and save the data in DB.

class SettingController {

    // Pass my types

    async create(request: Request, response: Response){
        
        // Get our response.body

        const { chat, username } = request.body;

        // Instantiating Settings Services

        const settingsServices = new SettingsService();

        try {

            // Because I used unstructured, ew need to pass the parameters in this way.

            const settings = await settingsServices.create({chat, username});

            return response.json(settings);

        }
        catch (err) {

            return response.status(400).json({
                message: err.message,
            });

        };

    };

    // Get user name to custom configuration the way user want. 

    async findByUsername(request: Request, response: Response) {

        const { username } = request.params;

        const settingsServices = new SettingsService();

        const settings = await settingsServices.findByUsername(username);

        return response.json(settings);

    }

    // Custom chat.

    async update(request: Request, response: Response) {

        const { username } = request.params;
        const { chat } = request.body;

        const settingsServices = new SettingsService();

        const settings = await settingsServices.update(username, chat);

        return response.json(settings);

    }

};

export { SettingController };


// embuscadoproximonivel