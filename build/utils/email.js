"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = require("nodemailer");

var _config = _interopRequireDefault(require("../config"));

var email = _config["default"].email;

var sendEmail = function sendEmail(options) {
  var transporter = (0, _nodemailer.createTransport)({
    host: email.host,
    port: email.port,
    auth: {
      user: email.user,
      pass: email.pass
    }
  });
  var mailOptions = {
    from: "NATOURS <no-reply@natours.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  return transporter.sendMail(mailOptions);
};

exports.sendEmail = sendEmail;