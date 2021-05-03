import { io } from "../http";

import { ConnectionsServices } from "../services/ConnectionsServices";

import { UsersServices } from "../services/UsersServices";

import { MessagesServices } from "../services/MessagesServices";

interface IParams {

    text: string,
    email: string,

};

io.on("connection", (socket) => {

    const connectionServices = new ConnectionsServices();
    const userService = new UsersServices();
    const messageServices = new MessagesServices();
    
    socket.on("Client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;

        let user_id = null;
        const userExists = await userService.findByEmail(email);

        if(!userExists) {

            const user = await userService.create(email);

            await connectionServices.create({

                socket_id,
                user_id: user.id,

            });

            user_id = user.id;

        } else {

            user_id = userExists.id;

            const connection = await connectionServices.findByUserId(userExists.id);

            if (!connection){
                await connectionServices.create({
                socket_id,
                user_id: userExists.id,
                });

            } else {
                connection.socket_id = socket_id;
                await connectionServices.create(connection);

            };

        };

        await messageServices.create({

            text,
            user_id,

        });

        const allMessages = await  messageServices.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionServices.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allUsers);
    });

    socket.on("client_send_to_admin", async (params) => {

        const { text, socket_admin_id } = params;

        const socket_id = socket.id;

        const { user_id } = await connectionServices.findBySocketID(socket_id);

        const message = await messageServices.create({

            text,
            user_id,

        });

        io.to(socket_admin_id).emit("adimin_receive_message", {

            message,
            socket_id,

        });

                
        socket.on("disconnect", async () => {

            console.log(socket.id);

            await connectionServices.deleteBySocketId(socket.id);
            
        });
        
    });

});
