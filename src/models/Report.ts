import mongoose from "mongoose";
import { ReportInfo } from "../interfaces/report/ReportInfo";

const ReportSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    place: {
      type: mongoose.Types.ObjectId,
      ref: "Place",
    },
    content: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ReportInfo & mongoose.Document>("Report", ReportSchema);
