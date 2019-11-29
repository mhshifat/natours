"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _process$env = process.env,
    PORT = _process$env.PORT,
    SERVER_URI = _process$env.SERVER_URI,
    MONGODB_URI = _process$env.MONGODB_URI,
    JWT_SECRET = _process$env.JWT_SECRET,
    JWT_EXPIRES_IN = _process$env.JWT_EXPIRES_IN,
    EMAIL_USER = _process$env.EMAIL_USER,
    EMAIL_PASS = _process$env.EMAIL_PASS,
    EMAIL_HOST = _process$env.EMAIL_HOST,
    EMAIL_PORT = _process$env.EMAIL_PORT;
var _default = {
  app: {
    port: PORT || 5000,
    serverUri: SERVER_URI || "http://localhost"
  },
  db: {
    mongodbUri: MONGODB_URI
  },
  jwt: {
    secret: JWT_SECRET || "skjdhkjshdshdsABdksjdkjshdjshdkassgdkASDhkjsghgdisiagfihfksdhfikdfg",
    expires: JWT_EXPIRES_IN || "1d"
  },
  email: {
    user: EMAIL_USER || "988500631761b4",
    pass: EMAIL_PASS || "280e7d436dea1f",
    host: EMAIL_HOST || "smtp.mailtrap.io",
    port: EMAIL_PORT || 25
  }
};
exports["default"] = _default;