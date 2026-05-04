import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,

    // 🔥 ADD THIS
    shop: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Faq = mongoose.model("Faq", faqSchema);