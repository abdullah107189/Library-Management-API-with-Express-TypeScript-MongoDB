"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./app/controllers/bookController");
const borrowController_1 = require("./app/controllers/borrowController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("API is running smoothly.");
});
app.use("/api/books", bookController_1.bookRouter);
app.use("/api/borrow", borrowController_1.borrowRouter);
exports.default = app;
