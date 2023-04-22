const socket = io();

socket.emit('message', 'Hola es un mensaje desde el FrontEnd')
// socket.on('event_socket_individual', data => {
//     console.log(data);
// })
// socket.on('evento_todos_menos actual', data => {
//     console.log(data);
// })

// socket.on('evento_todos', data => {
//     console.log(data);
// })