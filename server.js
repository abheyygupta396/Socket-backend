const EXPRESS = require('express');
const APP = EXPRESS();
PORT = process.env.PORT || 4000;
const IOSocket = require('socket.io');
const moment = require('moment');
const axios = require("axios");

var server = APP.listen(PORT);

var sock = IOSocket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

// let interval;

sock.on('connection', (socket) => { 

    socket.on('Connected', () => {

      console.log('Connected');
      sock.sockets.emit("Connected","Test")
  })
  // getLatestTransactions(socket);
  // getLatestBlocks(socket);
});
    
async function getLatestTransactions (socket) {
  try {
    const res = await axios.get(
      "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getLatestTransactions?skip=0&limit=1"
    );
  //   console.log(res)
    socket.emit("FromTransaction", res.data);
    sock.sockets.emit("Connected", "Test") // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

async function getLatestBlocks (socket) {
  try {
    const result = await axios.get(
      "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getLatestTransactions?skip=0&limit=1"
    );
  //   console.log(res)
    socket.emit("FromBlocks", result.data);
    sock.sockets.emit("Connected", "Test") // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

    // socket.on('newdataadded', data => {
    //   console.log("newdataadded")
    //   socket.emit("newdataadded", data)
    // })

//   socket.emit('connection', null);  
//   if (interval) {
//     clearInterval(interval);
// }
// console.log('HEllo');
// interval = setInterval(() => getApiAndEmit(socket), 3000);
//  }); 


// const socket = require('socket.io')
// var express = require('express'),
//     app = express(),
//     port = process.env.PORT || 4000;

// const cors = require('cors');
// // enable CORS without external module
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000' // URL of the react (Frontend) app
// }));



// app.get('/', (req, res) => {
//     res.send('Welcome');
// });

// var server = app.listen(port, () => {
//     console.log('Server started on: ' + port);
// });

// attach socket to the node server
// var io = require('socket.io').listen(server);
// require('./socket')(io);



                              
                  
                              
  

