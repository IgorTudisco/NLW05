// This file is responsible to services of settings

// Import dependencies

import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepositories";

// Creating interface

interface ISettingsServices {

    chat: boolean,
    username: string,

};

// Creating class

class SettingsService {

    private settingsRepository: Repository<Setting>;

    constructor() {

        this.settingsRepository = getCustomRepository(SettingsRepository);

    }

    async create({ chat, username} : ISettingsServices) {

        /*
            This code is like:
            Select * from settings where username = "username" limit 1;
        */

        const userAlreadyExists = await this.settingsRepository.findOne({
            username,
        });

        // If exist that massage throw this error

        if (userAlreadyExists) {
            throw new Error("User already exists");
        };

        // For to creating something in a table, We need to stepping
        
        // One stepping

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        // Second

        await this.settingsRepository.save(settings);

        return settings;

    };

};

// Exporting class

export { SettingsService };