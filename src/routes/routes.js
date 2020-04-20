import express from "express";
import schemaMiddleware from "../middlewares/movieMiddleware";
const database = require("../database/service");

var router = express.Router();

router.use(function (req, res, next) {
  console.log(
    `${Date.now()}|${req.method}|${req.path}|${JSON.stringify(req.body)}`
  );
  next();
});

router.get("/", function (req, res) {
  res.status(200);
  res.json({ message: "API is alive!" });
});

router.get("/movie", function (req, res) {
  var response = database.getMovies(req.body);
  if (response) {
    res.status(200);
    res.json(response);
  } else {
    res.status(204);
    res.json([]);
  }
});

router.post("/movie", schemaMiddleware(), function (req, res) {
  if (database.addMovie(req.body)) {
    res.status(201);
    res.json({ message: "Movie was added succesfully!" });
  }
  res.status(500);
  res.json({ message: "Internal server error. Please contact administrator" });
});

module.exports = router;
