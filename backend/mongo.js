// const mongoose = require("mongoose");

// // if (process.argv.length < 3) {
// //   console.log("give password as argument");
// //   process.exit(1);
// // }

// // const password = process.argv[2];

// const url = `mongodb+srv://samuelmmanor:tYxCEKnjWiaamRnq@cluster0.mgv9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false); // p3c

// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

const http = require("http");
const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// ---

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const Person = require("./models/person");

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

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
