import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { timestamps: true } 
);

export const Faq = mongoose.model("Faq", faqSchema);