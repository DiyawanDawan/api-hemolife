// addPostJadwalPMI.js

const express = require("express");
const router = express.Router();

// Contoh rute untuk menambahkan jadwal PMI
router.get("/list", (req, res) => {
  // Logika untuk menambahkan jadwal PMI
  res.status(200).json({ success: false, massage: "Welcome To List Bloge" })
});
module.exports = router;
