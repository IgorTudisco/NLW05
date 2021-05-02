// Client connection

// Import io

import { io } from "../http";

// Import connection services

import { ConnectionsServices } from "../services/ConnectionsServices";

// Import user services

import { UsersServices } from "../services/UsersServices";

// Import my messages services

import { MessagesServices } from "../services/MessagesServices";

// Creating interface

interface IParams {

    text: string,
    email: string,

};

// Creating connection and our events.
// In our event we using clint to identification with the this prefix

io.on("connection", (socket) => {

    // Instantiating our connection

    const connectionServices = new ConnectionsServices();

    // Instantiating our users

    const userService = new UsersServices();

    // Instantiating our message

    const messageServices = new MessagesServices();
    
    // Saving a connection with socket_id, user_id.
    
    socket.on("Client_first_access", async (params) => {

        // Getting the socket id

        const socket_id = socket.id;

        // Extracting data from params

        const { text, email } = params as IParams;

        // Estating user_id with null

        let user_id = null;

        // Verify the email.

        const userExists = await userService.findByEmail(email);

        if(!userExists) {

            const user = await userService.create(email);

            // Creating uor connection 

            await connectionServices.create({

                socket_id,
                user_id: user.id,

            });

            // Passing value to user_id.

            user_id = user.id;

        } else {
            
            // Passing existing value to user_id.

            user_id = userExists.id;

            // Looking for connection

            const connection = await connectionServices.findByUserId(userExists.id);

            // If not

            if (!connection){
                
                // Creating uor connection if uar exist 

                await connectionServices.create({

                socket_id,
                user_id: userExists.id,

                });

            } else {

                connection.socket_id = socket_id;

                await connectionServices.create(connection);

            };

        };

        // Saving the message

        await messageServices.create({

            text,
            user_id,

        });

        // Emit event call all messages.

        const allMessages = await  messageServices.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        // Connection all users with admin.

        const allUsers = await connectionServices.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allUsers);

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
            
            // Improvements
                    
            socket.on("disconnect", async () => {

                console.log(socket.id);

                await connectionServices.deleteBySocketId(socket.id);
                
            });
            
        });
               
    });

});
