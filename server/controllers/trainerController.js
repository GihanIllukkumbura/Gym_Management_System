const connection = require("../database");
const bcrypt = require("bcryptjs");

exports.getAssignedMember = (req, res) => {
  console.log("Get assigned member");
  const trainerId = req.params.id;
  connection.query(
    "SELECT users.* FROM users WHERE trainerId = ?",
    [trainerId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ members: result });
      }
    }
  );
};

exports.getTrainer = (req, res) => {
  console.log("Get trainer");
  const trainerId = req.params.id;
  connection.query(
    "SELECT * FROM trainers WHERE id = ?",
    [trainerId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ trainer: result[0] });
      }
    }
  );
};

exports.updateTrainer = (req, res) => {
  console.log("Update trainer");
  const trainerId = req.params.id;
  const { firstName, lastName, phone } = req.body;
  connection.query(
    "UPDATE trainers SET firstName = ?, lastName = ?, phone = ? WHERE id = ?",
    [firstName, lastName, phone, trainerId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "Trainer updated" });
      }
    }
  );
};

exports.updatePassword = (req, res) => {
  console.log("Update password");
  const trainerId = req.params.id;
  const { curPassword, newPassword } = req.body;

  const findUserQuery = "SELECT * FROM trainers WHERE id = ?";
  connection.query(findUserQuery, [trainerId], async (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ error: "Trainer not found" });
      }

      const user = result[0];
      const isPasswordValid = await bcrypt.compare(curPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Current Password Wrong" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatePasswordQuery =
        "UPDATE trainers SET password = ? WHERE id = ?";
      connection.query(
        updatePasswordQuery,
        [hashedPassword, trainerId],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error(updateErr);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Password updated" });
          }
        }
      );
    }
  });
};
