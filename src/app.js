const routeConfig = require("./config/route-config.js");
const express = require("express");
const app = express();





 const appConfig = require("./config/main-config.js");

 appConfig.init();
 routeConfig.init(app);
 console.log(process.env.megasecret);

 module.exports = app;