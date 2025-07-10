import express, { Request, Response } from "express";
import { Books } from "../models/bookModel";
export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
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
bookRouter.get("/", async (req: Request, res: Response) => {});
bookRouter.patch("/", async (req: Request, res: Response) => {});
bookRouter.delete("/", async (req: Request, res: Response) => {});
