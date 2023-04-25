const user_transportRoutes = require("../controllers/user_transport.controller");
module.exports = app => {
    const user_transport = require("../controllers/user_transport.controller.js");

    var router = require("express").Router();

    router.post("/", user_transport.create);

    router.get("/", user_transport.findAll);

    router.get("/:id", user_transport.findOne);

    router.put("/:id", user_transport.update);

    router.delete("/:id", user_transport.delete);

    router.delete("/", user_transport.deleteAll);

    app.use("/user_transports", router);
};
