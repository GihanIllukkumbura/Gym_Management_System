const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/member-count", adminController.getMemberCount);
router.get("/members", adminController.getMembers);
router.delete("/member/:id", adminController.deleteMember);
router.post("/trainer/add", adminController.addTrainer);
router.get("/trainers", adminController.getTrainers);
router.post("/member/assign-trainer", adminController.assignTrainer);
router.delete("/trainer/:id", adminController.deleteTrainer);

module.exports = router;
