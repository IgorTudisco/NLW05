// Business rule

import { getCustomRepository, Repository } from "typeorm";
import { Users } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepositories"

class UsersServices {

    private usersRepository: Repository<Users>;

    constructor() {

        this.usersRepository =  getCustomRepository(UsersRepository);

    }

    async create(email: string) {

        // Checking if users exist

        const userExists = await this.usersRepository.findOne({

            email

        });

        // If true

        if(userExists) {

            return userExists

        };

        // If false 

        const user = this.usersRepository.create({

            email,

        });

        await this.usersRepository.save(user);

        // Return User

        return user;

    }

};

export { UsersServices };