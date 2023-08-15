const multer = require("multer");
const path = require("path");

const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../../public"),
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, `${date}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 500000, // 500kilobites
  },
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (!acceptedTypes.includes(mimetype)) {
      cb({
        status: 400,
        errorName: "file not allowed",
        error: `Only ${acceptedTypes.join(", ")} are allowed`,
      });
    }
    cb(null, false);
  },
});

module.exports = upload;
