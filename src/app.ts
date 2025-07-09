require("dotenv").config();
import express, { Application } from "express";
import { bookRouter } from "./app/controllers/bookController";
const app: Application = express();

app.use("/api/books", bookRouter);

app.use("/api/borrow", bookRouter);

export default app;
