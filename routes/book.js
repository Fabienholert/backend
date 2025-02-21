const express = require("express");
const auth = require("../middleware/auth.js");
const router = express.Router();
const multer = require("../middleware/multer-config.js");

const bookCtrl = require("../controllers/book.js");

router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:id", auth, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
