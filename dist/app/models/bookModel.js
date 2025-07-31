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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: [
            "BIOGRAPHY",
            "FANTASY",
            "FICTION",
            "HISTORY",
            "NON_FICTION",
            "SCIENCE",
        ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
        type: Number,
        min: [0, "Copies must be a positive number"],
        required: true,
    },
    available: { type: Boolean, default: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.statics.removeCopies = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found while removing copies");
        }
        const availableCopies = Math.max(0, book.copies - quantity);
        book.copies = availableCopies;
        book.available = availableCopies > 0 ? true : false;
        yield book.save();
        return book;
    });
};
bookSchema.pre("save", function (next) {
    this.available = this.copies > 0;
    next();
});
exports.Books = (0, mongoose_1.model)("Books", bookSchema);
