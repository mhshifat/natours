import Tour from "../models/tourModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numOfTour: { $sum: 1 },
        numOfRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  return res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
});

export const getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numOfTour: { $sum: 1 },
        tours: { $push: "$name" }
      }
    },
    {
      $addFields: { month: "$_id" }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numOfTour: -1 }
    },
    {
      $limit: 12
    }
  ]);

  return res.status(200).json({
    success: true,
    data: {
      plan
    }
  });
});

export const getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.tourId).populate("reviews");
  if (!tour) throw new AppError("Tour not found", 404);

  return res.status(200).json({
    success: true,
    data: {
      tour
    }
  });
});

export const getTours = catchAsync(async (req, res) => {
  // Modifying req.query to filter more efficiently
  const excludedFields = ["sort", "limit", "page", "fields"];
  let queryObj = { ...req.query };
  // Filtering...
  excludedFields.forEach(el => delete queryObj[el]);

  // Advance filtering...
  queryObj = JSON.parse(
    JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    )
  );

  // Sorting...
  const sortBy = req.query.sort
    ? req.query.sort.replace(/,/g, " ")
    : "-createdAt";

  // Filter by fields...
  const selectedStr = req.query.fields
    ? req.query.fields.replace(/,/g, " ")
    : "-__v";

  // Pagination...
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const tours = await Tour.find(queryObj)
    .sort(sortBy)
    .select(selectedStr)
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    result: tours.length,
    data: {
      tours
    }
  });
});

export const createTour = catchAsync(async (req, res) => {
  const createdTour = await Tour.create(req.body);

  return res.status(201).json({
    success: true,
    data: {
      tour: createdTour
    }
  });
});

export const updateTour = catchAsync(async (req, res) => {
  const updatedTour = await Tour.findByIdAndUpdate(
    req.params.tourId,
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    data: {
      tour: updatedTour
    }
  });
});

export const deleteTour = catchAsync(async (req, res) => {
  const deletedTour = await Tour.findByIdAndRemove(req.params.tourId);

  return res.status(204).json({
    success: true,
    data: deletedTour
  });
});
