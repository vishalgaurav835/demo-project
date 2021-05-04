const mongoose = require('mongoose');
const config = require('config')
const http = require('http');
const app = require('./app');
const fs = require('fs');
const WebSocket = require('ws');

const DB = config.get('dbConfig.hostUri');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
.then(() => console.log('DB connection successful!'))
.catch((err) => console.log('Error while connecting DB', err));

const port = process.env.PORT || 7080;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(port, () => {
  console.log(`ToDoApp is running on port ${port}...`);
});