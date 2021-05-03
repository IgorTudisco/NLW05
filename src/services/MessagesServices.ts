// Our services message

// import { v4 as uuid } from "uuid";
import { getCustomRepository, Repository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepositories";
import { Message } from "../entities/Message";

interface IMessageCreate {

    admin_id?: string,
    text: string,
    user_id: string
};

class MessagesServices {

    private messageRepository: Repository<Message>;
    constructor() {

        this.messageRepository = getCustomRepository(MessageRepository);

    };
    
    async create({ admin_id, text, user_id, }: IMessageCreate) {
        const message = this.messageRepository.create({
        
            admin_id,
            text,
            user_id,

        });

        // // insert id

        // if (!message.id) {            
        //     message.id = uuid();
        // };
        
        await this.messageRepository.save(message);
        return message;

    };

    async listByUser(user_id: string){
        const list = await this.messageRepository.find({

            where: { user_id },
            relations: ["user"],
        });

        return list;
    }

};

export { MessagesServices };