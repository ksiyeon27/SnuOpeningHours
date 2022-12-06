import mongoose from "mongoose";
import { PlaceInfo } from "../interfaces/place/PlaceInfo";

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    isClosed: {
      type: Boolean,
    },
    dayOff: {
      type: Array,
    },
    openTime: {
      type: Array,
    },
    closeTime: {
      type: Array,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<PlaceInfo & mongoose.Document>("Place", PlaceSchema);
