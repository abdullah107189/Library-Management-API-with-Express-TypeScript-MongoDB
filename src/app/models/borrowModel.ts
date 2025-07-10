import { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrowInterface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Books", required: true },
    dueDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
