import Jimp from "jimp";

const resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("No file uploaded"));
  }

  try {
    const filePath = req.file.path;
    const image = await Jimp.read(filePath);
    await image.resize(250, 250).writeAsync(filePath);

    next();
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
  }
};

export default resizeAvatar;
