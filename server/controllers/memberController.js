const connection = require("../database");

exports.updateMember = (req, res) => {
  console.log("Update member");
  const { id, firstName, lastName, height, weight } = req.body;
  connection.query(
    "UPDATE users SET firstName = ?, lastName = ?, height = ?, weight = ?  WHERE id = ?",
    [firstName, lastName, height, weight, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

exports.getMember = (req, res) => {
  const { id } = req.params;

  console.log("Get member", id);
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ user: result[0] });
    }
  });
};

exports.updateWeight = (req, res) => {
  const { id, weight, date } = req.body;

  console.log("Update weight", id, weight, date);

  connection.query(
    "SELECT * FROM memberWeight WHERE memberId = ? AND date = ?",
    [id, date],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.length > 0) {
          connection.query(
            "UPDATE memberWeight SET weight = ? WHERE memberId = ? AND date = ?",
            [weight, id, date],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
              } else {
                res.status(200).json({ result, message: "Updated weight" });
              }
            }
          );
        } else {
          connection.query(
            "INSERT INTO memberWeight (memberId, weight, date) VALUES (?, ?, ?)",
            [id, weight, date],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
              } else {
                res.status(200).json({ result, message: "Added weight" });
              }
            }
          );
        }
      }
    }
  );
};

exports.getWeightList = (req, res) => {
  const { id } = req.params;

  console.log("Get weight list", id);

  connection.query(
    "SELECT * FROM memberWeight WHERE memberId = ? ORDER BY date",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ weightData: result });
      }
    }
  );
};
