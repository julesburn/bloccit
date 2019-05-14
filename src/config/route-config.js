module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);
	const marcoRoutes = require("../routes/marco");
	app.use(marcoRoutes);
  }
}