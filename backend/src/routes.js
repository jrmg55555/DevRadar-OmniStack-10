const { Router } = require("express");
const DevController = require("./controlllers/DevController");
const SearchController = require("./controlllers/SearchController");

const routes = Router();

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.put("/devs/:id", DevController.update);
routes.delete("/devs/:id", DevController.destroy);

routes.get("/search", SearchController.index);

module.exports = routes;
