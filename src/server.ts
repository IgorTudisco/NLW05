import { http } from "./http";
import "./Websocket/admin";
import "./Websocket/client";

http.listen(3333, () => console.log("Server is running on port 3333"));
