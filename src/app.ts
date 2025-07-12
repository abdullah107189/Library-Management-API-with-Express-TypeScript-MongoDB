require("dotenv").config();
import express, { Application } from "express";
import { bookRouter } from "./app/controllers/bookController";
import { borrowRouter } from "./app/controllers/borrowController";
const app: Application = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running smoothly.");
});

app.use("/api/books", bookRouter);

app.use("/api/borrow", borrowRouter);

export default app;
