import Joi from "joi";
import Genres from "./genres";

const getMovies = Joi.object({
  genres: Joi.array().items(Genres).optional(),
  duration: Joi.number().integer().min(1).optional(),
});

const addMovie = Joi.object({
  genres: Joi.array().items(Genres).required(),
  title: Joi.string().required().max(255),
  year: Joi.number().integer().min(1).required(),
  runtime: Joi.number().integer().min(1).required(),
  director: Joi.string().required().max(255),
  actors: Joi.array().items(Joi.string()).optional(),
  plot: Joi.string().optional(),
  posterUrl: Joi.string().uri().optional(),
});

export default [
  {
    method: "post",
    schema: addMovie,
  },
  { method: "get", schema: getMovies },
];
