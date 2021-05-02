// Business rule

import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepositories"

class UsersServices {

    private userRepository: Repository<User>;

    constructor() {

        this.userRepository =  getCustomRepository(UserRepository);

    }

    async create(email: string) {

        // Checking if users exist

        const userExists = await this.userRepository.findOne({

            email

        });

        // If true

        if(userExists) {

            return userExists

        };

        // If false 

        const user = this.userRepository.create({

            email,

        });

        await this.userRepository.save(user);

        // Return User
        // If not, save to DB

       return user;

    };

    // Creating method find by email.
    
    async findByEmail(email: string) {

        const user = await this.userRepository.findOne({
        email,
        });
        return user;

    };

};

export { UsersServices };