import { model, Schema } from "mongoose";
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

borrowSchema.post("save", async function (doc, next) {
  const id = doc.book;
  const bookInfo = await Books.findById(doc.book);
  if (!bookInfo) {
    return next(new Error("Book not found for Borrow post-save hook"));
  }
  const availableCopies = Math.max(
    0,
    Number(bookInfo?.copies) - Number(doc.quantity)
  );

  let update = {};
  if (availableCopies == 0) {
    update = {
      copies: availableCopies,
      available: false,
    };
  } else {
    update = {
      copies: availableCopies,
      available: true,
    };
  }
  const result = await Books.findByIdAndUpdate(id, update, { new: true });
  next();
});
export const Borrows = model("Borrows", borrowSchema);
