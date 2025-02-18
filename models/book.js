import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    format: {
        type: String,
        enum: ["poche", "manga", "audio"],
        default: "poche"
    }
}, {
    timestamps: true
});

const Book = mongoose.model("book", bookSchema);

export default Book;