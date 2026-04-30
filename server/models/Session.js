import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    shop: {
      type: String,
      required: true,
      index: true
    },
    state: String,
    isOnline: {
      type: Boolean,
      required: true
    },
    scope: String,
    expires: Date,
    accessToken: String,
    onlineAccessInfo: mongoose.Schema.Types.Mixed,
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model("Session", sessionSchema);
