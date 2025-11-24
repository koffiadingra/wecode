import mongoose, { models, Schema } from "mongoose";

const CommentsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
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
const Comments = models.Comments || mongoose.model("Comments", CommentsSchema);
export default Comments;
