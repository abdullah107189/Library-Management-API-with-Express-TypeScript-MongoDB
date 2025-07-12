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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrowModel_1 = require("../models/borrowModel");
const bookModel_1 = require("../models/bookModel");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { book, quantity, dueDate } = body;
        const isBookAvailable = yield bookModel_1.Books.findById(book);
        const copies = Number(isBookAvailable === null || isBookAvailable === void 0 ? void 0 : isBookAvailable.copies);
        if (!isBookAvailable) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                error: "Invalid book ID",
            });
        }
        else if (copies == 0) {
            return res.status(400).json({
                success: false,
                message: "No copies available",
                error: "All copies are borrowed",
            });
        }
        else if (quantity < 0 || quantity === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid borrow quantity",
                error: "Quantity must be greater than 0",
            });
        }
        else if (copies < Number(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available",
                error: `Requested: ${quantity}, Available: ${copies}`,
            });
        }
        else {
            if (!book || !quantity || !dueDate) {
                return res.status(400).json({
                    success: false,
                    message: "Required fields missing",
                    error: "book, quantity, dueDate are mandatory",
                });
            }
            else {
                const createBody = yield borrowModel_1.Borrows.create(body);
                res.status(200).json({
                    success: true,
                    message: "Book borrowed successfully",
                    data: createBody,
                });
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Updating time error",
            error: error,
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrowModel_1.Borrows.aggregate([
            // stage 1
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: 1 },
                },
            },
            // stage 2
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            // stage 3
            { $unwind: "$bookInfo" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "Borrowed books summary retrieving error",
            error: error,
        });
    }
}));
exports.borrowRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.borrowRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
