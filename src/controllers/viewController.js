import Tour from "../models/tourModel";
import catchAsync from "../utils/catchAsync";

export const renderOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find({});
  res.status(200).render("overview", {
    title: "All Tours",
    tours
  });
});

export const renderTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user"
  });
  res.status(200).render("tour", {
    title: tour.name,
    tour
  });
});

export const renderLogin = (req, res) => {
  res.status(200).render("login", {
    title: "Login into your account!"
  });
};
