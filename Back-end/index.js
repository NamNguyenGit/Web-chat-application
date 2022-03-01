const express = require("express");
const config = require("./config/app");
const bodyParser = require("body-parser");
const router = require("./router/");
const cors = require("cors")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.options('*', cors()) //fk thí cors
app.use(router);


const port = config.appPort;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
