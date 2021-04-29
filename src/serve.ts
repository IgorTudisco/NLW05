// Import http

import { http } from "./http";

// Import only client file.

import "./Websocket/client";

// Import only admin file.

import "./Websocket/admin";

// Changing to http file.

// Passing the door and a message.

http.listen(3333, () => console.log("Server is running on port 3333"));
