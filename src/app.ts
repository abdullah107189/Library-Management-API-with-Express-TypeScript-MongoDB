require("dotenv").config();
import express, { Application } from "express";
import { bookRouter } from "./app/controllers/bookController";
import { borrowRouter } from "./app/controllers/borrowController";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "live-deploy-url"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("API is running smoothly.");
});

app.use("/api/books", bookRouter);

app.use("/api/borrow", borrowRouter);

export default app;
