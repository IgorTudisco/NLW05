import { http } from "./http";
import "./Websocket/client";
import "./Websocket/admin";


http.listen(3333, () => console.log("Server is running on port 3333"));
