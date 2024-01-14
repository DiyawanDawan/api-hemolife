const express = require("express");
const router = express.Router();

const {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
	getAllBloodDonors,
	adminProfile,
	updateAdminProfile,
	postJadwalDonorDarahPMI,
	addBlogPosts
} = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/middleware");

router.get("/dashboardAdmin", getAllBloodBank);
router.get("/bankDarah/:id", getBloodBankByPmiId);
router.put("/bankDarah/update/:id", updateBloodBankByPmiId);
router.get("/pendonorDarah", getAllBloodDonors);
router.get("/adminProfile", authenticateToken, adminProfile);
router.put("/adminProfile/update", authenticateToken, updateAdminProfile);
router.post("/addPostJadwalPMI", authenticateToken, postJadwalDonorDarahPMI)
router.post("/blogesAddPost", addBlogPosts)
module.exports = router;
