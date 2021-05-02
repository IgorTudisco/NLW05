
/*
    The express comes without types, So we need install that.
    However, we to use this code yarn add @types/express -D.
    We use this D because we use that in a develop path.
*/

import express from "express";

// import o http to creating server.
// Import o serve to socket.io

import { createServer } from "http";
import { Server, Socket } from "socket.io"

// Import database

/*

    In typescript we don't need to refer a file,
    we need to refer only folder and he
    understanding thar our reference is index.ts.

    When we type this code in this way
    he understanding we want to
    creating our DB too.

*/

import "./database";

// Import routs

import { routes } from "./routes";

// import path

import path from "path"

const app = express();

// Config path

app.use(express.static(path.join(__dirname,"../", "public")));

// Routes 

app.set("views", path.join(__dirname, "../", "public"));

// Using patter html

app.engine("html", require("ejs").renderFile);

// Set view with patter

app.set("view egine", "html");

// Routes client

app.get("/pages/client", (request, response) => {

    return response.render("html/client.html")

});

// Routes admin

app.get("/pages/admin", (request, response) => {

    return response.render("html/admin.html")

});

// Creating server http

const http = createServer(app); // => Creating protocol http

// Creating server oi so socket

const io = new Server(http); // => Creating protocol ws (websocket)

// Method connection.

io.on("connection", (socket: Socket) => {
    console.log("You are connecting with serve", socket.id);
});

// Enable json

app.use(express.json());

// Passing routes

app.use(routes);


export { http, io };