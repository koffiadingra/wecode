import mongoose, { models, Schema } from "mongoose";

const favorisSchema = new Schema(
  {
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
const Favoris = models.Favoris || mongoose.model("Favoris", favorisSchema);
export default Favoris;
