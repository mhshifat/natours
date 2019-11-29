import { hash } from "bcryptjs";
import crypto from "crypto";
import { model, Schema } from "mongoose";
import { isEmail } from "validator";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "User name is required!"]
  },
  email: {
    type: String,
    required: [true, "User email is required!"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please provide a valid email address"]
  },
  photo: String,
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required!"],
    minlength: [10, "Password must be at least 10 characters long!"],
    select: false
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, "Please confirm your password!"],
    validate: {
      validator(val) {
        return val === this.password;
      },
      message: "Passwords do not match!"
    }
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["user", "admin", "guide", "lead-guide"],
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.passwordChangedAfter = function(jwtTokenIssuedAt) {
  if (this.passwordChangedAt)
    return jwtTokenIssuedAt * 1000 < this.passwordChangedAt.getTime();
  return false;
};

userSchema.methods.createResetPasswordToken = function() {
  const resetPassword = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassword)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetPassword;
};

export default model("User", userSchema);
