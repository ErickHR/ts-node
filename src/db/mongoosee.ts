import mongoose from "mongoose";
import ENVIROMENT from "../config/enviroment";

export default function connectDB () {
  return mongoose
    .connect(ENVIROMENT.DB_URI)
};
