import express, { Request, Response } from "express";
import { Borrows } from "../models/borrowModel";
import { Books } from "../models/bookModel";
export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { book, quantity, dueDate } = body;
    const isBookAvailable = await Books.findById(book);
    const copies = Number(isBookAvailable?.copies);
    if (!isBookAvailable) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Invalid book ID",
      });
    } else if (copies == 0) {
      return res.status(400).json({
        success: false,
        message: "No copies available",
        error: "All copies are borrowed",
      });
    } else if (quantity < 0 || quantity === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid borrow quantity",
        error: "Quantity must be greater than 0",
      });
    } else if (copies < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: `Requested: ${quantity}, Available: ${copies}`,
      });
    } else {
      if (!book || !quantity || !dueDate) {
        return res.status(400).json({
          success: false,
          message: "Required fields missing",
          error: "book, quantity, dueDate are mandatory",
        });
      } else {
        const createBody = await Borrows.create(body);
        res.status(200).json({
          success: true,
          message: "Book borrowed successfully",
          data: createBody,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Updating time error",
      error: error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Borrows.aggregate([
      // stage 1
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
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
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Borrowed books summary retrieving error",
      error: error,
    });
  }
});
borrowRouter.patch("/", async (req: Request, res: Response) => {});
borrowRouter.delete("/", async (req: Request, res: Response) => {});
