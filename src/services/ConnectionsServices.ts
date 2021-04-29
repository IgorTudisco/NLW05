// Uor connection services

import { getCustomRepository, Repository } from "typeorm";

import { Connection } from "../entities/Connection";

import { ConnectionRepositories } from "../repositories/ConnectionRepositories";

interface IConnectionCreate {

    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;

}

class ConnectionsServices {

    private connectionRepositories: Repository<Connection>

    constructor() {

        this.connectionRepositories = getCustomRepository(ConnectionRepositories);

    };

    async create ({socket_id, user_id, admin_id, id}: IConnectionCreate) {

        const connection = this.connectionRepositories.create({

            socket_id,
            user_id,
            admin_id,
            id,

        });

        await this.connectionRepositories.save(connection);

        return connection;
        
    }

};

export { ConnectionsServices };