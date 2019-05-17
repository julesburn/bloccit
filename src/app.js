<<<<<<< HEAD
const routeConfig = require("./config/route-config.js");

routeConfig.init(app);
=======
const express = require("express");
const app = express();

 app.use("/", (req, res, next) => {
   res.send("Welcome to Bloccit")
 });

module.exports = app;
>>>>>>> 5346e774fcc009600ea9d7c3bdcd3180a4d8bdf9
