import express, { Request, Response } from "express";
export const bookRouter = express.Router();

bookRouter.get("/", async (req: Request, res: Response) => {});
bookRouter.post("/", async (req: Request, res: Response) => {});
bookRouter.patch("/", async (req: Request, res: Response) => {});
bookRouter.delete("/", async (req: Request, res: Response) => {});
