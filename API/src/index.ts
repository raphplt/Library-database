import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerUsers from "./routes/users.route";
import routerBooks from "./routes/books.route";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/users", routerUsers);

app.use("/books", routerBooks)

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
