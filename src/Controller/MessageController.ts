import { Request, Response } from "express";
import { MessagesServices } from "../services/MessagesServices";

class MessageController {

    async create(request: Request,  response: Response,) {

        const { admin_id, text, user_id } = request.body;

        const messageService = new MessagesServices();

        const message = await messageService.create({

            admin_id,
            text,
            user_id

        });

        return response.json(message);

    };

    async showByUser(request: Request, response: Response) {

        const { id } = request.params;

        const messageService = new MessagesServices();

        const list = await messageService.listByUser(id);

        return response.json(list);

    }

};

export { MessageController };