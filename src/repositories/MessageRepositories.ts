
import { Repository, EntityRepository } from "typeorm";
import { Messages } from "../entities/Message";

@EntityRepository()
class MessagesRepository extends Repository<Messages> {};

export { MessagesRepository };