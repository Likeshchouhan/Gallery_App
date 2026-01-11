const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  imageName: String,
  imageUrl: String,
  viewType: {
    type: String,
    enum: ["vertical", "horizontal"]
  },
  position: Number
});

module.exports = mongoose.model("Image", imageSchema);
