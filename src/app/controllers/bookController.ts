import express, { Request, Response } from "express";
import { Books } from "../models/bookModel";
export const bookRouter = express.Router();

// crate book route
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createBook = await Books.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

// find book route using by sort + sortby + filter + limit
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const filter = query.filter as string;
    const filterObj = filter ? { genre: filter } : {};

    const rawSortBy = query.sortBy as string;
    let sortBy = rawSortBy || "createdAt";
    const rawSort = query.sort as string;
    const sortValue = rawSort === "desc" ? -1 : 1;

    const rawLimit = query.limit as string;
    const limitNumber = Number(rawLimit);

    const result = await Books.find(filterObj)
      .sort({ [sortBy]: sortValue })
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching books failed",
      error: error,
    });
  }
});

bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const result = await Books.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching books failed",
      error: error,
    });
  }
});

// update book route
bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const update = req.body;
    const result = await Books.findByIdAndUpdate(bookId, update, { new: true });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: (error as Error).message,
    });
  }
});

// delete book route
bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const result = await Books.findByIdAndDelete(bookId);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the book",
      error: error,
    });
  }
});
