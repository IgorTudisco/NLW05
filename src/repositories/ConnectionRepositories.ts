import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionRepositories extends Repository<Connection> {};

export { ConnectionRepositories };