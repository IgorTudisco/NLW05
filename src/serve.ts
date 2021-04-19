
/*
    The express comes without types, So we need install that.
    However, we to use this code yarn add @types/express -D.
    We use this D because we use that in a develop path.
*/

import express, { response } from "express";

const app = express();

/*
    Creating routes.

    Methods:
        Get
        Post
        Put
        Delete
        Patch - means change a specific data.
*/

app.get("/", (request, response) => {

   // return response.send("Olá NLW 05");

   // return in json

   return response.json({
       message: "Olá NLW 05!",
   })
});

app.post("/", (request, response) => {

    return response.json({

        message: "User saved successfully!"

    })

})

// Passing the door and a message.

app.listen(3333, () => console.log("Server is running on port 3333"));




// misaoespacial