// This document is responsible for client chat.

// Let to receive admin id.

let socket_admin_id = null;

// Let to receive user email.

let emailUser = null;

// Let to receive socket.

let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {

  // Init socket

  socket = io();

  const chat_help = document.getElementById("chat_help");

  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");

  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;

  // Init email.

  emailUser = email;

  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {

    const params = {

      email,
      text,

    };

    socket.emit("client_first_access", params, (call, err) => {

      if (err) {

        console.err(err);

      } else {

        console.log(call);

      }

    });

  });

  // Listen the event.This event is receive all client message.

  socket.on("client_list_all_messages", (messages) => {

  var template_client = document.getElementById("message-user-template").innerHTML;

  var template_admin = document.getElementById("admin-template").innerHTML;

  messages.forEach((message) => {

    if (message.admin_id === null) {

      const rendered = Mustache.render(template_client, {

        message: message.text,        
        email,

      });

      document.getElementById("messages").innerHTML += rendered;

    } else {

      const rendered = Mustache.render(template_admin, {

        message_admin: message.text,

      });

      document.getElementById("messages").innerHTML += rendered;
    }

  });

});

  // Listen the event.This event is receive admin message.

  socket.on("admin_send_to_client", (message) => {

    // Init socket admin id.

    socket_admin_id = message.socket_id;

    const template_admin = document.getElementById("admin-template").innerHTML;

    const rendered = Mustache.render(template_admin, {

      message_admin: message.text,

    });

    document.getElementById("messages").innerHTML += rendered;

  });

});

// When client push th button the message will send to admin.
// Event click.

document.querySelector("#send_message_button").addEventListener("click", (event) => {

  const text = document.getElementById("message_user");

  const params = {
    text: text.value,
    socket_admin_id,
  };

  // Emit event.

  socket.emit("client_send_to_admin", params);

  // Pass message to template by id. This id are in html.

  const template_client = document.getElementById("message-user-template").innerHTML;

  // Rendering message by Mustache.

  const rendered = Mustache.render(template_client, {

    message: text.value,
    email: emailUser,

  });

  document.getElementById("messages").innerHTML += rendered;

});
