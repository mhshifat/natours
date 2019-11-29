import "dotenv/config";
import mongoose from "mongoose";
import Review from "../../models/reviewModel";
import Tour from "../../models/tourModel";
import User from "../../models/userModel";
import reviews from "./reviews.json";
import tours from "./tours.json";
import users from "./users.json";

const importTourData = async () => {
  try {
    console.log("[ NATOURS ] Starting import process!");
    await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews, { validateBeforeSave: false });
    console.log("[ NATOURS ] Tour dev data imported successfully!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const removeTourData = async () => {
  try {
    console.log("[ NATOURS ] Starting delete process!");
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("[ NATOURS ] Tour dev data removed successfully!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(async () => {
    if (process.argv[2] === "--import") await importTourData();
    else if (process.argv[2] === "--delete") await removeTourData();
    else
      console.log(
        "[ NATOURS ] Please specify either --import or --delete in the command!"
      );
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
