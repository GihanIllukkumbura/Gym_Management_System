const connection = require("../database");

exports.addNotification = (req, res) => {
  console.log("Add notification");
  const { message, date } = req.body;
  connection.query(
    "INSERT INTO notifications ( message, date ) VALUES (?, ?)",
    [message, date],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Notification added" });
      }
    }
  );
};

//get all notifications in future dates
exports.getAllNotifications = (req, res) => {
  console.log("Get all notifications");
  connection.query(
    "SELECT * FROM notifications WHERE date >= CURDATE() ORDER BY date ASC",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log(result);
        res.status(200).json({ messages: result });
      }
    }
  );
};

exports.deleteNotification = (req, res) => {
  console.log("Delete notification");
  const notificationId = req.params.id;
  connection.query(
    "DELETE FROM notifications WHERE id = ?",
    [notificationId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "Notification deleted" });
      }
    }
  );
};

exports.addNotificationTrainer = (req, res) => {
  console.log("Add notification for trainer");
  const { message, date, trainerId, memberId } = req.body;
  connection.query(
    "INSERT INTO notifications ( message, date, trainerId,memberId ) VALUES (?, ?, ?, ?)",
    [message, date, trainerId, memberId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Notification added" });
      }
    }
  );
};

exports.deleteNotificationTrainer = (req, res) => {
  console.log("Delete notification");
  const notificationId = req.params.id;
  connection.query(
    "DELETE FROM notifications WHERE id = ?",
    [notificationId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "Notification deleted" });
      }
    }
  );
};
