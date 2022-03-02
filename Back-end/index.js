const express = require("express");
const config = require("./config/app");
const bodyParser = require("body-parser");
const router = require("./router/");
const cors = require("cors");
const http = require('http')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options("*", cors()); //fk this cors
app.use(router);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const port = config.appPort;

const server = http.createServer(app)
const SocketServer = require('./socket')
SocketServer(server)


server.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
