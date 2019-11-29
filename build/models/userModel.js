"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bcryptjs = require("bcryptjs");

var _crypto = _interopRequireDefault(require("crypto"));

var _mongoose = require("mongoose");

var _validator = require("validator");

var userSchema = new _mongoose.Schema({
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
    validate: [_validator.isEmail, "Please provide a valid email address"]
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
      validator: function validator(val) {
        return val === this.password;
      },
      message: "Passwords do not match!"
    }
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    "enum": ["user", "admin", "guide", "lead-guide"],
    "default": "user"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  active: {
    type: Boolean,
    "default": true,
    select: false
  }
});
userSchema.pre("save", function _callee(next) {
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified("password")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return _regenerator["default"].awrap((0, _bcryptjs.hash)(this.password, 12));

        case 4:
          this.password = _context.sent;
          this.passwordConfirm = undefined;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
userSchema.pre("save", function _callee2(next) {
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!this.isModified("password") || this.isNew)) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", next());

        case 2:
          this.passwordChangedAt = Date.now() - 1000;
          next();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
userSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});

userSchema.methods.passwordChangedAfter = function (jwtTokenIssuedAt) {
  if (this.passwordChangedAt) return jwtTokenIssuedAt * 1000 < this.passwordChangedAt.getTime();
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  var resetPassword = _crypto["default"].randomBytes(32).toString("hex");

  this.resetPasswordToken = _crypto["default"].createHash("sha256").update(resetPassword).digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  return resetPassword;
};

var _default = (0, _mongoose.model)("User", userSchema);

exports["default"] = _default;