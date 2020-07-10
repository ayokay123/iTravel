const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");
const logs = require("./api/logs");

require("dotenv").config();
const app = express();
/* ***  Database *** */
mongoose.connect(process.env.DATABASA_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* ***  Middlewares *** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

/* ***  Routes *** */
app.use("/api/logs", logs);
/* *** Error Handlers *** */
app.use(middlewares.NotFound);
app.use(middlewares.ErrorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});
