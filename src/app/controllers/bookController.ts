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

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { searchTerm, genreFilter, availabilityFilter, limit, page } =
      req.query;

    // Build filter object
    const filterObj: any = {};
    if (genreFilter && genreFilter !== "all") {
      filterObj.genre = genreFilter;
    }
    if (availabilityFilter && availabilityFilter !== "all") {
      filterObj.available = availabilityFilter === "available";
    }
    if (searchTerm) {
      filterObj.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
        { genre: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Limit
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [books, total] = await Promise.all([
      Books.find(filterObj).skip(skip).limit(limitNumber),
      Books.countDocuments(filterObj),
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching books failed",
      error,
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
