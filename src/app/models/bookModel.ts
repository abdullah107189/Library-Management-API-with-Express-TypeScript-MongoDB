import { model, Schema } from "mongoose";
import { IBook, IBookMethod } from "../interfaces/bookInterface";

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
bookSchema.statics.removeCopies = async function (bookId, quantity) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book not found while removing copies");
  }
  const availableCopies = Math.max(0, book.copies - quantity);
  book.copies = availableCopies;
  book.available = availableCopies > 0 ? true : false;
  await book.save();
  return book;
};

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

export const Books = model<IBook, IBookMethod>("Books", bookSchema);
