const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

const authRoutes = require("./routes/auth");
const adminRoute = require("./routes/admin");
const memberRoute = require("./routes/member");
const notificationRoute = require("./routes/notifications");
const trainer = require("./routes/trainer");

// Use the routes as middleware
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/member", memberRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/trainer", trainer);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
