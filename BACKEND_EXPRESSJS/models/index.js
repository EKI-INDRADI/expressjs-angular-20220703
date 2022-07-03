const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.wishlist = require("./wishlist.model")(mongoose);
db.rating = require("./rating.model")(mongoose);
module.exports = db;

//const db = require("../models");