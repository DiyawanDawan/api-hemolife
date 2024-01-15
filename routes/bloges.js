// addPostJadwalPMI.js

const express = require("express");
const {authenticateToken} = require("../middleware/middleware");
const blogsController = require("../controllers/blogsController");
const router = express.Router();

// Contoh rute untuk menambahkan jadwal PMI
router.get("/list", blogsController.getAllBlog);
router.get("/detail/:id", blogsController.blogDetailById);
router.get("/search", blogsController.searchBlog )
module.exports = router;
