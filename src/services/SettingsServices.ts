// This file is responsible to services of settings

// Import dependencies

import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingRepositories";

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

    // Find user.

    async findByUsername(username: string){

        const settings = await this.settingsRepository.findOne({

            username,

        });

        return settings;

    };

    // Custom chat.

    async update(username: string, chat: boolean){

        await this.settingsRepository
        .createQueryBuilder()

        // Passing uor entity in parameters.

        .update(Setting)

        // Passing what we want to changing.

        .set({ chat })

        // Where username is equal the name of user.

        .where("username = :username", {

            username,

        })
        .execute();

    };

};

// Exporting class

export { SettingsService };