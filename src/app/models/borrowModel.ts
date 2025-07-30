import { Error, model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrowInterface";
import { Books } from "./bookModel";

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

// when borrow created then call this middleware
borrowSchema.post("save", async function (doc, next) {
  try {
    await Books.removeCopies(doc.book.toString(), doc.quantity);
    next();
  } catch (error) {
    next(error as Error);
  }
});
borrowSchema.pre("save", async function (next) {
  try {
    console.log("creating borrow...");
    next();
  } catch (error) {
    next(error as Error);
  }
});
export const Borrows = model("Borrows", borrowSchema);
