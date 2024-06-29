import multer from "multer";
import path from "path";
import gravatar from "gravatar";

import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const extention = file.originalname.split(".").pop();
    const email = req.body.email || req.user.email;
    const filename =
      gravatar.url(email).replace("//www.gravatar.com/avatar/", "") +
      "." +
      extention;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return callback(HttpError(400, ".exe not allow extention"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
