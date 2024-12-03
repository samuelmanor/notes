const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/person");

require("dotenv").config();

// const MONGODB_URI = `mongodb+srv://samuelmmanor:${password}@cluster0.ysn4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb:", error.message);
  });
