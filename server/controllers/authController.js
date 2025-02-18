const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../database");

exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  // Validate email and password
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required." });
  }

  // Check if the user exists in the database
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length === 0) {
      const query = "SELECT * FROM trainers WHERE email = ?";
      connection.query(query, [email], (err, results) => {
        if (err) {
          console.error("Error querying the database:", err);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
        const user = results[0];
        console.log("user", user);

        // Compare the provided password with the hashed password from the database
        bcrypt.compare(password, user?.password, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            console.error("Error comparing passwords:", bcryptErr);
            return res.status(500).json({ message: "Internal server error." });
          }

          if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
          }

          // Create a JWT token with a secret key and user information
          const token = jwt.sign(
            { userID: user.id, email: user.email, role: user.role },
            "your_secret_key_here",
            { expiresIn: "1h" } // Token will expire in 1 hour
          );
          console.log("token", user);

          // Send the JWT token as the response
          res.json({ token, role: results[0].role, id: results[0].id });
        });
      });
    } else {
      const user = results[0];

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error("Error comparing passwords:", bcryptErr);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        // Create a JWT token with a secret key and user information
        const token = jwt.sign(
          { userID: user.id, email: user.email, role: user.role },
          "your_secret_key_here",
          { expiresIn: "1h" } // Token will expire in 1 hour
        );
        console.log("token", user);

        // Send the JWT token as the response
        res.json({ token, role: results[0].role, id: results[0].id });
      });
    }
  });
};

exports.register = (req, res) => {
  const { email, gender, dob, password, firstName, lastName, role } = req.body;

  console.log(req.body);

  // Validate the input data (You can add more validation as needed)
  if (!email || !password || !firstName || !lastName || !role || !dob) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the email already exists in the database
  const checkemailQuery = "SELECT email FROM users WHERE email = ?";
  connection.query(checkemailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email in the database:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "email already exists." });
    }

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Error hashing password:", hashErr);
        return res.status(500).json({ message: "Internal server error." });
      }

      // Store the new user in the database
      const createUserQuery =
        "INSERT INTO users (email, gender, dob, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        createUserQuery,
        [email, gender, dob, hashedPassword, firstName, lastName, role],
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
            dob,
            role,
          };
          res
            .status(201)
            .json({ message: "User registered successfully.", user: newUser });
        }
      );
    });
  });
};
