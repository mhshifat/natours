import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const getUser = (req, res) => {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    data: {
      users
    }
  });
});

export const createUser = (req, res) => {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

export const updateUser = (req, res) => {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

export const deleteUser = (req, res) => {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

export const getMe = catchAsync(async (req, res) => {
  const me = await User.findById(req.user.id);

  return res.status(200).json({
    success: true,
    data: {
      me
    }
  });
});

export const updateMe = catchAsync(async (req, res) => {
  const payload = {};
  if (req.body.name) payload.name = req.body.name;
  if (req.body.email) payload.email = req.body.email;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, payload, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({
    success: true,
    data: {
      user: updatedUser
    }
  });
});

export const deleteMe = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true
    }
  );

  return res.status(204).json({
    success: true,
    data: {
      user: updatedUser
    }
  });
});
