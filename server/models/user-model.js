const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  authId: { type: String, required: true, unique: true },
  username: { type: String, default: "anonymous" },
  email: String,
  thumbnailFile: {
    type: String,
    default:
      "https://res.cloudinary.com/dw2liwt16/image/upload/v1557028803/computer-user-clip-art_g70iha.jpg"
  },
  date: {
    type: Date,
    default: Date.now
  },
  favoriteStocks: [String]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
