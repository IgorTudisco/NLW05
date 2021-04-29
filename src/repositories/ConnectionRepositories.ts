// Repositories of connection

import { EntityRepository, Repository } from "typeorm";

// Guaranteed that is uor connection entities and not connection from typeorm

import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionRepositories extends Repository<Connection> {};

export { ConnectionRepositories };