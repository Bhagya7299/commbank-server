const mongoose = require("mongoose");

// ✅ Direct MongoDB URI (same as server.js)
const MONGO_URI = "mongodb://admin:password123321@ac-bky8wd4-shard-00-00.ybckmo0.mongodb.net:27017,ac-bky8wd4-shard-00-01.ybckmo0.mongodb.net:27017,ac-bky8wd4-shard-00-02.ybckmo0.mongodb.net:27017/commbank?ssl=true&replicaSet=atlas-wehx4j-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected (Seed)");

  const Goal = mongoose.model("Goal", {
    name: String,
    targetAmount: Number,
    savedAmount: Number,
    icon: String
  });

  const data = [
    {
      name: "Buy Car",
      targetAmount: 10000,
      savedAmount: 2000,
      icon: "car.png"
    },
    {
      name: "Trip",
      targetAmount: 5000,
      savedAmount: 1000,
      icon: "trip.png"
    }
  ];

  await Goal.deleteMany({});
  await Goal.insertMany(data);

  console.log("Data seeded ✅");
  process.exit();
})
.catch(err => {
  console.log("Mongo Error ❌:", err);
});