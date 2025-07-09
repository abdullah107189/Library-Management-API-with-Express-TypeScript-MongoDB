require("dotenv").config();
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`app listen on this port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
