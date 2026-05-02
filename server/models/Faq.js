import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

export const Faq = mongoose.model("Faq", faqSchema);