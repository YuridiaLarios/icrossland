const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFavStocks = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  symbols: [String]
});

const UserFavStocks = mongoose.model("FavoriteStocks", userFavStocks);

module.exports = UserFavStocks;
