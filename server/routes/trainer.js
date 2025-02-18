const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");

router.get("/members/:id", trainerController.getAssignedMember);
router.get("/:id", trainerController.getTrainer);
router.put("/:id", trainerController.updateTrainer);
router.put("/update-password/:id", trainerController.updatePassword);

module.exports = router;
