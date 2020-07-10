const { Router } = require("express");
const LogEntry = require("../models/LongEntry");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entities = await LogEntry.find();
    res.json(entities);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const newLogEntry = await logEntry.save();
    res.json(newLogEntry);
  } catch (error) {
    console.log(req.body);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
