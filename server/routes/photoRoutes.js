const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../file/multer");
const gallery = require("../controllers/photoController");

router.post("/upload", auth, upload.single("image"), gallery.uploadImage);
router.get("/gallery", auth, gallery.getImages);

module.exports = router;