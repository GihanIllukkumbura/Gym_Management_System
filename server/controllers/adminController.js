const connection = require("../database");
const bcrypt = require("bcryptjs");

exports.getMemberCount = (req, res) => {
  console.log("Get member count");
  connection.query(
    "SELECT COUNT(*) AS memberCount FROM users WHERE role = 'member'",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const memberCount = result[0].memberCount;
        res.status(200).json({ memberCount });
      }
    }
  );
};

exports.getMembers = (req, res) => {
  console.log("Get members");
  connection.query(
    "SELECT users.* FROM users LEFT Join trainers ON users.trainerId = trainers.id OR users.trainerId = NULL WHERE users.role = 'member'",
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

exports.deleteMember = (req, res) => {
  console.log("Delete member");
  const memberId = req.params.id;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [memberId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "Member deleted" });
      }
    }
  );
};

exports.addTrainer = (req, res) => {
  console.log("Add trainer");
  console.log(req.body);
  const { firstName, lastName, email, password, gender, phone } = req.body;
  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Error hashing password:", hashErr);
      return res.status(500).json({ message: "Internal server error." });
    }

    // Store the new user in the database
    const createUserQuery =
      "INSERT INTO trainers (email, gender, password, firstName, lastName, role, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      createUserQuery,
      [email, gender, hashedPassword, firstName, lastName, "trainer", phone],
      (createErr, createResult) => {
        if (createErr) {
          console.error("Error creating user:", createErr);
          return res.status(500).json({ message: "Internal server error." });
        }

        // You can include additional user data in the response if needed
        const newUser = {
          id: createResult.insertId,
          email,
          firstName,
          lastName,
          gender,
          phone,
          role: "trainer",
        };
        res
          .status(201)
          .json({ message: "Trainer registered successfully.", user: newUser });
      }
    );
  });
};

exports.getTrainers = (req, res) => {
  console.log("Get trainers");
  connection.query("SELECT * FROM trainers", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ trainers: result });
    }
  });
};

exports.assignTrainer = (req, res) => {
  console.log("Assign trainer", req.body);
  const { memberId, trainerId } = req.body;
  connection.query(
    "UPDATE users SET trainerId = ? WHERE id = ?",
    [trainerId, memberId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Trainer assigned" });
      }
    }
  );
};

exports.deleteTrainer = (req, res) => {
  console.log("Delete trainer");
  const trainerId = req.params.id;
  connection.query(
    "DELETE FROM trainers WHERE id = ?",
    [trainerId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", message: err });
      } else {
        res.status(200).json({ message: "Trainer deleted" });
      }
    }
  );
};
