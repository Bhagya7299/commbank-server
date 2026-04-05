const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ✅ Direct MongoDB URI (NO .env)
const MONGO_URI = "mongodb://admin:password123321@ac-bky8wd4-shard-00-00.ybckmo0.mongodb.net:27017,ac-bky8wd4-shard-00-01.ybckmo0.mongodb.net:27017,ac-bky8wd4-shard-00-02.ybckmo0.mongodb.net:27017/commbank?ssl=true&replicaSet=atlas-wehx4j-shard-0&authSource=admin&retryWrites=true&w=majority";

// ❌ DO NOT use process.env here
mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
  });
})
.catch(err => {
  console.log("Mongo Error ❌:", err);
});

// Schema
const GoalSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  savedAmount: Number,
  icon: { type: String, required: false }
});

const Goal = mongoose.model("Goal", GoalSchema);

// Route
app.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});