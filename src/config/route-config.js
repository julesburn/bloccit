module.exports = {
    init(app){
        const staticRoutes = reuiqre("../routes/static");
        app.use(staticRoutes);
    }
}