const express = require("express");
const app = express();
const config = require('./config/app')

app.get("/home", (req, res) => {
  return res.send("home");
});

app.get("/login", (req, res) => {
    return res.send("login k");
  });


const port = config.appPort
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
