// Our services message

import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessageRepositories";
import { Messages } from "../entities/Message";


// The admin_id is optional because in the first message probably we don't have a attendant yet.
// The icon ? do this.	"admin_id": "221c0adc-5640-435f-bc97-9eeff9bd0ec8"

interface IMessageCreate {

    admin_id?: string,
    text: string,
    user_id: string
};

class MessagesServices {

    // Creating a attribute private and your constructor.

    private messagesRepository: Repository<Messages>;
    constructor() {

        this.messagesRepository = getCustomRepository(MessagesRepository);

    };
    
    async create({ admin_id, text, user_id }: IMessageCreate) {

        const message = this.messagesRepository.create({
        
            admin_id,
            text,
            user_id,

        });

        await this.messagesRepository.save(message);

        return message;

    };

    async listByUser(user_id: string){


        const list = await this.messagesRepository.find({

            where: { user_id },
            relations: ["user"],

        });

        return list;

    }

};

export { MessagesServices };