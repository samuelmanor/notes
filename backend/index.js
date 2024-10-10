const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/person");

require("dotenv").config();

const MONGODB_URI = `mongodb+srv://samuelmmanor:tYxCEKnjWiaamRnq@cluster0.mgv9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb:", error.message);
  });
