const express = require("express");
const config = require("./config/app");
const bodyParser = require("body-parser");
const router = require("./router/");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options("*", cors()); //fk this cors
app.use(router);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const port = config.appPort;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
