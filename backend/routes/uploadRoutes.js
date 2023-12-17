import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
import cloudinary from "../utils/cloudinary.js";

const storageMulter = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({
  storage: storageMulter,
  fileFilter,
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file, "from outside");
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
  // cloudinary.uploader.upload(`${req.file.path}`, function (err, result) {
  //   console.log(req.file.path, result, "from inside");
  //   if (err) {
  //     //   res.status(500);
  //     //   throw new Error("Something went wrong with uploading image");
  //     // }
  //     // res.status(200).json({
  //     //   success: true,
  //     //   message: "Uploaded!",
  //     //   data: result,
  //     // });
  //     res.status(500).json({
  //       success: false,
  //       message: "Something went wrong with uploading image",
  //       error: err.message,
  //     });
  //   } else {
  //     res.status(200).json({
  //       success: true,
  //       message: "Uploaded!",
  //       data: result,
  //     });
  //   }
  // });
});

export default router;
