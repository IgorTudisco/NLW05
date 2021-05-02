// Admin connection 

// Import io.

import { io } from "../http";

// Import connection

import { ConnectionsServices } from "../services/ConnectionsServices";

// Import Message

import { MessagesServices } from "../services/MessagesServices";

// Connection admin

io.on("connect", async (socket) => {

    const connectionsServices = new ConnectionsServices();

    const messagesServices = new MessagesServices();

    const allConnectionsWithoutAdmin = await connectionsServices.findAllWithoutAdmin();

    // Emit event by io, because this is for all admin.
    // Ever admin can listen this.

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    
    // When you need to respond the same people to call you. You can use function callback.

    socket.on("admin_list_messages_by_user", async (params, callback) => {

        const { user_id } = params;

        const allMessage = await messagesServices.listByUser(user_id);

        callback(allMessage);

    });

    // Creating socket on send message to receive our params.

    socket.on("admin_send_message", async (params) => {

        const { user_id, text } = params;

        await messagesServices.create({

            text,
            user_id,

            // Turn our communication easy we use socket.id in admin_id.

            admin_id: socket.id,
            
        });

        const { socket_id } = await connectionsServices.findByUserId(user_id);

        // Emit event to client.
        // In this case we use io with function "to" and creat a event emit.

        io.to(socket_id).emit("admin_send_to_client", {

            text,
            socket_id: socket.id,
        });

    });

    // Listening support event.

    socket.on("admin_user_in_support", async (params) => {

        const { user_id } = params;

        // Update connection user.

        await connectionsServices.updateAdminID(user_id, socket.id);

        const allConnectionsWithoutAdmin = await connectionsServices.findAllWithoutAdmin();

        // Emit event

        io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    })

});