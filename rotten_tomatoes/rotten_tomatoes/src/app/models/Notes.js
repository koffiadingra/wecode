import mongoose, { models, Schema } from "mongoose";

const notesSchema = new Schema(
  {
    note: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Notes = models.Notes || mongoose.model("Notes", notesSchema);
export default Notes;
