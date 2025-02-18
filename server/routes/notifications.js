const express = require("express");
const router = express.Router();
const notifyController = require("../controllers/notificationController");

router.post("/add", notifyController.addNotification);
router.post("/add-trainer", notifyController.addNotificationTrainer);
router.get("/", notifyController.getAllNotifications);
router.delete("/:id", notifyController.deleteNotification);
router.delete("/trainer/:id", notifyController.deleteNotificationTrainer);

module.exports = router;
