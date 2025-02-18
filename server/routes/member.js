const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.put("/update", memberController.updateMember);
router.get("/:id", memberController.getMember);
router.post("/update-weight", memberController.updateWeight);
router.get("/weight/:id", memberController.getWeightList);

module.exports = router;
