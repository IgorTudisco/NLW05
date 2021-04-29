// Our services message

import { v4 as uuid } from "uuid";
import { getCustomRepository, Repository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepositories";
import { Message } from "../entities/Message";


// The admin_id is optional because in the first message probably we don't have a attendant yet.
// The icon ? do this.	"admin_id": "221c0adc-5640-435f-bc97-9eeff9bd0ec8"

interface IMessageCreate {

    admin_id?: string,
    text: string,
    user_id: string
};

class MessagesServices {

    // Creating a attribute private and your constructor.

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

        // insert id

        if (!message.id) {            
            message.id = uuid();
        };
        
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