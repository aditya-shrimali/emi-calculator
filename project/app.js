const express = require("express");
const bodyParser = require("body-parser");
const emiRoutes = require("./routes/emiRoutes");
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

const app = express();
app.use(bodyParser.json());

app.use("/api", emiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
