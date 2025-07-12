require("dotenv").config();
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(process.env.PORT, () => {
      console.log(`app listen on this port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
