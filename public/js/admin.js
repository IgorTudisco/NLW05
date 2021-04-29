
// Connection admin.

const socket = io();

// Listen event

socket.on("admin_list_all_users", (connection) => {

  console.log(connection);

});