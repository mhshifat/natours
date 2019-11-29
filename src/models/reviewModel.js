import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"]
    },
    ratting: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour!"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user!"]
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
});

export default model("Review", reviewSchema);
