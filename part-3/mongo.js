const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Define schema and model
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const PhoneBook = mongoose.model("PhoneBook", phonebookSchema);

// --- CLI mode ---
if (require.main === module) {
  if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
  }

  const password = process.argv[2];
  const url = `mongodb+srv://sanjeev_rai101:${password}@sanveevcluster0.rpcts8f.mongodb.net/phonebook?retryWrites=true&w=majority&appName=SanveevCluster0`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url).then(() => {
    if (process.argv.length === 3) {
      // List entries
      PhoneBook.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((entry) => {
          console.log(`${entry.name} ${entry.number}`);
        });
        mongoose.connection.close();
      });
    } else if (process.argv.length === 5) {
      // Add entry
      const name = process.argv[3];
      const number = process.argv[4];

      const newEntry = new PhoneBook({ name, number });
      newEntry.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    } else {
      console.log("Invalid number of arguments.");
      mongoose.connection.close();
    }
  });
} else {
  // --- Server mode ---

  const url = process.env.MONGODB_URI;
  if (!url) {
    console.error("MONGODB_URI environment variable not set.");
    process.exit(1);
  }

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  app.use(cors());
  app.use(express.json());
  app.use(express.static("dist"));

  morgan.token("body", (req) =>
    req.method === "POST" ? JSON.stringify(req.body) : ""
  );
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :body"
    )
  );

  // Define your API routes here (e.g. GET, POST /api/persons)

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}
