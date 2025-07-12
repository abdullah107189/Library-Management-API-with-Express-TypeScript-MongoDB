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
exports.Borrows = void 0;
const mongoose_1 = require("mongoose");
const bookModel_1 = require("./bookModel");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Books", required: true },
    dueDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
// when borrow created then call this middleware
borrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield bookModel_1.Books.removeCopies(doc.book.toString(), doc.quantity);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("creating borrow...");
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Borrows = (0, mongoose_1.model)("Borrows", borrowSchema);
