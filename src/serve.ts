
/*
    The express comes without types, So we need install that.
    However, we to use this code yarn add @types/express -D.
    We use this D because we use that in a develop path.
*/

import express from "express";

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

import { routes } from "../src/routes.js";

const app = express();

// Passing routes

app.use(routes);

// Passing the door and a message.

app.listen(3333, () => console.log("Server is running on port 3333"));
