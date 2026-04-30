import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    accessToken: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopSchema);
