// Client connection

// Import io

import { io } from "../http";

// Import connection services

import { ConnectionsServices } from "../services/ConnectionsServices";

// Import user services

import { UsersServices } from "../services/UsersServices"

// Creating connection and our events.
// In our event we using clint to identification with the this prefix

io.on("connection", (socket) => {

    // Instantiating our connection

    const connectionServices = new ConnectionsServices();

    // Instantiating our users

    const userServices = new UsersServices();
    
    socket.on("Client_first_access", async (params) => {

        // Getting the socket id

        const socket_id = socket.id;

        // Extracting data from params

        const { text, email } = params;

        console.log(` ${text} - ${email} `);

        const userExists = await userServices.findByEmail(email);

        if(!userExists) {

            const user = await userServices.create(email);

            // Creating uor connection 

            await connectionServices.create({

                socket_id,
                user_id: user.id,

            });

        } else {

            // Creating uor connection if uar exist 

            await connectionServices.create({

                socket_id,
                user_id: userExists.id,

            });

        };

       
        // Salving a connection with socket_id, user_id.

    });

});
