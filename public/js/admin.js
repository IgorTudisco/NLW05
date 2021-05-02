
// Connection admin.

const socket = io();

// Variable array 

let connectionsArrayUsers = [];

// Listen event

socket.on("admin_list_all_users", (connections) => {

  connectionsArrayUsers = connections;

  // We need to pass document empty to avoid duplication.

  document.getElementById("list_users").innerHTML = "";

  // Template

  let template = document.getElementById("template").innerHTML;

  // connection

  connections.forEach((connection) => {

    const rendered = Mustache.render(template, {

      email: connection.user.email,
      id: connection.socket_id,

    });

    document.getElementById("list_users").innerHTML += rendered;

  });

});

// Function who is call our connection with client.

function call(id) {

  const connection = connectionsArrayUsers.find((connection) => connection.socket_id === id);

  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render(template, {
    
    email: connection.user.email,
    id: connection.user_id,

  });

  document.getElementById("supports").innerHTML += rendered;

  const params = {
      
    user_id: connection.user_id,
  
  };

  // To help admin with attendance

  socket.emit("admin_user_in_support", params);

  socket.emit("admin_list_messages_by_user", params, messages => {

    const divMessage = document.getElementById(`allMessage ${connection.user_id}`);

    messages.forEach(message => {

      const createDiv = document.createElement("div");

      // Testing message 

      if (message.admin_id === null) {
        
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `<span>${connection.user.email} </span>`;

        createDiv.innerHTML += `<span>${message.text}</span>`;

        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      
      } else {

        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Attendant: <span>${message.text}</span>`;

        createDiv.innerHTML += `<span class="admin_date>${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}`;
      }

      divMessage.appendChild(createDiv);

    });

  });
  
};


// Function send message (admin send message to client)

function sendMessage(id) {

  const text = document.getElementById(`send_message_${id}`);

  const params = {

    text: text.value,
    user_id: id
  };

  socket.emit("admin_send_message", params);

  // Getting message by id from user.

  const divMessage = document.getElementById(`allMessage${id}`);

  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_admin";
  createDiv.innerHTML = `Attendant: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class = "admin_date>${params.text}</span>`;
  createDiv.innerHTML += `<span class = "admin_date${dayjs().format()}`;

  divMessage.appendChild(createDiv);

  text.value = "";

}

socket.on("admin_receive_message", (data) => {

  // Here we using array of attendance that insert up.

  const connection = connectionInSupport.find((connection) => connection.socket_id === data.socket_id);
  
  const divMessage = document.getElementById(`allMessages${connection.user_id}`);

  const creatDiv = document.createElement("div");

  createDiv.className = "admin_message_client";
  createDiv.innerHTML = `<span>${connection.user.email}</span>`;
  createDiv.innerHTML += `<span>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class = "admin_date">${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;

  divMessage.appendChild(createDiv);

});
