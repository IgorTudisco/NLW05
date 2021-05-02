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
      
  };

  // Creating method how is find uor connection

  async findByUserId(user_id: string){

    const connection = await this.connectionRepositories.findOne({

        user_id,

    });

    return connection;

  }

  async findAllWithoutAdmin() {

      const connections = await this.connectionRepositories.find({

          where: { admin_id: null },
          relations: [ "user" ],

      });

      return connections;

  };

  async findBySocketID(socket_id: string) {

    const connection = await this.connectionRepositories.findOne({

      socket_id,

    });

    return connection;

  };

  // Method update connection.

  async updateAdminID(user_id: string, admin_id: string) {

    await this.connectionRepositories.createQueryBuilder()

    .update(Connection)

    .set({ admin_id })

    .where("user_id = :user_id", {
      
      user_id,
    
    })

    .execute();

  };

  // Method delete.

  async deleteBySocketId(socket_id: string) {

    await this.connectionRepositories.createQueryBuilder()

    .delete()
    
    .where("socket_id = :socket_id", {
      
      socket_id,
    
    })
    
    .execute();

  };

};

export { ConnectionsServices };