// addPostJadwalPMI.js

const express = require("express");
const {authenticateToken} = require("../middleware/middleware");
const jadwalController = require("../controllers/jadwalController");
const router = express.Router();

// Contoh rute untuk menambahkan jadwal PMI
router.get("/list", (req, res) => {
  // Logika untuk menambahkan jadwal PMI
  res.status(200).json({ success: false, massage: "Welcome To List Bloge" })
});
router.get("/detail/:id", (req, res) => {
  res.status(200).json({ success: false, massage: "Detail Bloges by Id" })
});
router.get("/search", (req, res) => {
  res.status(200).json({ success: false, massage: "Hasil search Bloges by Id" })
});
module.exports = router;
