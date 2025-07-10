import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";

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
    description: String,
    copies: {
      type: Number,
      min: [0, "Not allow negative number"],
      required: true,
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Book = model("Books", bookSchema);
