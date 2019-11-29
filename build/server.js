"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _express = _interopRequireDefault(require("express"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _helmet = _interopRequireDefault(require("helmet"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _config = _interopRequireDefault(require("./config"));

var _appMiddleware = require("./middlewares/appMiddleware");

var _appRoutes = _interopRequireDefault(require("./routes/v1/appRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/v1/authRoutes"));

var _reviewRoutes = _interopRequireDefault(require("./routes/v1/reviewRoutes"));

var _tourRoutes = _interopRequireDefault(require("./routes/v1/tourRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/v1/userRoutes"));

var _viewRoutes = _interopRequireDefault(require("./routes/v1/viewRoutes"));

var app = _config["default"].app,
    db = _config["default"].db;
var limiter = (0, _expressRateLimit["default"])({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many request, please try again in an hour!"
});
var server = (0, _express["default"])();
server.use((0, _helmet["default"])());
server.use((0, _morgan["default"])("dev"));
server.use(_express["default"].json({
  limit: "10kb"
}));
server.use((0, _cookieParser["default"])());
server.use((0, _expressMongoSanitize["default"])());
server.use((0, _xssClean["default"])());
server.set("view engine", "pug");
server.set("views", _path["default"].join(__dirname, "views"));
server.use(_express["default"]["static"](_path["default"].join(__dirname, "..", "public"))); // View Routes

server.use("/", _viewRoutes["default"]); // Api Routes

server.use("/api", limiter);
server.use("/api/v1", _authRoutes["default"]);
server.use("/api/v1/users", _userRoutes["default"]);
server.use("/api/v1/tours", _tourRoutes["default"]);
server.use("/api/v1/reviews", _reviewRoutes["default"]); // App Routes

server.use(_appRoutes["default"]);
server.use(_appMiddleware.errorHandling);

_mongoose["default"].connect(db.mongodbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  // eslint-disable-next-line no-console
  console.log("[ NATOURS ] A database connection has been established!");
  return server.listen(app.port);
}).then(function () {
  // eslint-disable-next-line no-console
  console.log("[ NATOURS ] Server is running on ".concat(app.serverUri, ":").concat(app.port, "!"));
});