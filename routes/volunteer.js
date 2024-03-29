const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { authenticateToken } = require("../middleware/middleware");

router.get("/list", volunteerController.listVolunteer);
router.get("/search", authenticateToken, volunteerController.searchVolunteer);
router.post(
  "/request",
  authenticateToken,
  volunteerController.requestVolunteer
);

module.exports = router;
