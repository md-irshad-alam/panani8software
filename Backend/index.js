const exprees = require("express");
const db = require("./Config/db");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = exprees();
app.use(exprees.json());
app.use(cors());
// for testing
app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// actual route handler
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(process.env.PORT || 8080, async () => {
  await db;
});
