"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookModel_1 = require("../models/bookModel");
exports.bookRouter = express_1.default.Router();
// crate book route
exports.bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const createBook = yield bookModel_1.Books.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
}));
// find book route using by sort + sortby + filter + limit 
exports.bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const filter = query.filter;
        const filterObj = filter ? { genre: filter } : {};
        const rawSortBy = query.sortBy;
        let sortBy = rawSortBy || "createdAt";
        const rawSort = query.sort;
        const sortValue = rawSort === "desc" ? -1 : 1;
        const rawLimit = query.limit;
        const limitNumber = Number(rawLimit);
        const result = yield bookModel_1.Books.find(filterObj)
            .sort({ [sortBy]: sortValue })
            .limit(limitNumber);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetching books failed",
            error: error,
        });
    }
}));
exports.bookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield bookModel_1.Books.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetching books failed",
            error: error,
        });
    }
}));
// update book route
exports.bookRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const update = req.body;
        const result = yield bookModel_1.Books.findByIdAndUpdate(bookId, update, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error: error.message,
        });
    }
}));
// delete book route
exports.bookRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield bookModel_1.Books.findByIdAndDelete(bookId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete the book",
            error: error,
        });
    }
}));
