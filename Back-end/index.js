const express = require("express");
const app = express();
const config = require("./config/app");
const bodyParser = require("body-parser");
const router = require("./router/");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(router);

const port = config.appPort;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
