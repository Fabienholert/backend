const express = require("express");
const auth = require("../middleware/auth.js");
const router = express.Router();
const multer = require("../middleware/multer-config.js");
const sharp = require("../middleware/sharp-config.js");

const bookCtrl = require("../controllers/book.js");

router.get("/bestrating", bookCtrl.getBestRating);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.put("/:id", auth, multer, sharp, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
