// Admin connection 

// Import io.

import { io } from "../http";

// Import connection

import { ConnectionsServices } from "../services/ConnectionsServices"

// Connection admin

io.on("connect", async (socket) => {

    const connectionsServices = new ConnectionsServices();

    const allConnectionsWithoutAdmin = await connectionsServices.findAllWithoutAdmin()

    // Emit event by io, because this is for all admin.
    // Ever admin can listen this.

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);


});