const transport = require("../controllers/transport.controller");
module.exports = app => {
    const transport = require("../controllers/transport.controller.js");

    var router = require("express").Router();

    router.post("/", transport.create);

    router.get("/", transport.findAll);

    router.get("/:id", transport.findOne);

    router.put("/:id", transport.update);

    router.delete("/:id", transport.delete);

    router.delete("/", transport.deleteAll);

    app.use("/transports", router);
};
