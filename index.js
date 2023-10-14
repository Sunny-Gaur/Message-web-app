const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let users={};
// app.use(express.static('public'))
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });


app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/client.js', (req, res) => {
  res.sendFile(__dirname + '/public/client.js');
});


// {
//     "version": 2,
//     "name": "native-server",
//     "builds": [{ "src": "index.js", "use": "@vercel/node" }],
//     "routes": [{ "src": "/(.*)", "dest": "/index.js" }]
  // }






io.on('connection', (socket) => {

  socket.on('new-user-joined', (names) => {
    users[socket.id]=names;
    console.log(names);

    // io.sockets.emit("broadcast", { msg: names });
    socket.broadcast.emit('user-joined',names);
  })

  socket.on("send",function(message){
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
})

  
  //  socket.on('msgdata', (msg) => {
  //   io.sockets.emit('msgdata', msg);
  // });

  socket.on("disconnect",(data)=>{
    socket.broadcast.emit('left-user',users[socket.id]);
    delete users[socket.id];
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});