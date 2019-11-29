import Review from "../models/reviewModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find(req.params.tourId || {});

  return res.status(200).json({
    success: true,
    data: {
      reviews
    }
  });
});

export const createReview = catchAsync(async (req, res) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const createdReview = await Review.create(req.body);

  return res.status(201).json({
    success: true,
    data: {
      review: createdReview
    }
  });
});

export const getReview = catchAsync(async (req, res) => {
  const query = {};

  if (req.params.tourId) query.tour = req.params.tourId;
  const review = await Review.findOne({ ...query, _id: req.params.reviewId });
  if (!review) throw new AppError("Review not found", 404);

  return res.status(200).json({
    success: true,
    data: {
      review
    }
  });
});

export const updateReview = catchAsync(async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.reviewId,
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    data: {
      review: updatedReview
    }
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const deletedReview = await Review.findByIdAndRemove(req.params.reviewId);

  return res.status(204).json({
    success: true,
    data: deletedReview
  });
});
