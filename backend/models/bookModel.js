import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  availableCopies:{ type: Number, default: 1 },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000) } // 7 days ahead
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
