const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  const userId = req.user.id;
  const { imageName, viewType } = req.body;

  const count = await Image.countDocuments({ userId });

  const image = await Image.create({
    userId,
    imageName,
    viewType,
    imageUrl: `/uploads/${req.file.filename}`,
    position: count + 1
  });

  res.json(image);
};

exports.getImages = async (req, res) => {
  const userId = req.user.id;
  const images = await Image.find({ userId }).sort({ position: 1 });
  res.json(images);
};
