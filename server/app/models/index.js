const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.transports = require("./transport.model.js")(mongoose);
db.user_transports = require("./user_transport.model")(mongoose);

module.exports = db;
