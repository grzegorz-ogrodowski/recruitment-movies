import "lodash.combinations";
import _ from "lodash";
import fs from "fs";
var config = require("./config");

export function getMovies(event) {
  console.log("handle get-movie event");
  console.log(event);
  var jsonData = loadJsonFile();

  if (event.genres) {
    return getMoviesWithGenres(event, jsonData);
  }

  if (event.runtime) {
    return getMoviesWithRuntime(event, jsonData);
  }

  return _.sample(jsonData.movies);
}

export function addMovie(event) {
  console.log("handle add-movie event");
  console.log(event);
  console.log(config);
  if (!event) {
    return;
  }
  var jsonData = loadJsonFile();
  const id = jsonData.movies.length;
  event.id = id + 1;
  jsonData.movies.push(event);
  fs.writeFile(config.dbPath, JSON.stringify(jsonData, null, 4), function (
    err
  ) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  return true;
}

export function useDatabase() {
  const data = loadFile();
  if (data) {
    console.log("Database loaded");
  }
}

function loadFile() {
  return fs.readFileSync(config.dbPath, "utf-8", (err, data) => {
    if (err) throw err;
    return data;
  });
}

function loadJsonFile() {
  return JSON.parse(loadFile());
}

function getMoviesWithRuntime(event, jsonData) {
  const durationRange = 10;
  let clone = _.clone(jsonData.movies);
  clone = _.shuffle(clone);
  return clone.find(
    (item) =>
      item.runtime <= event.runtime + durationRange &&
      item.runtime >= event.runtime - durationRange
  );
}

function getMoviesWithGenres(event, jsonData) {
  let combinations = (combinations = _.flatMap(event.genres, (v, i, a) =>
    _.combinations(a, i + 1)
  ));

  let result = [];
  const durationRange = 10;
  combinations.map((genres) => {
    let movies = jsonData.movies.filter(
      (item) =>
        item.genres.length === genres.length &&
        item.genres.every((ig) => genres.includes(ig)) &&
        (event.runtime === 0 ||
          (event.runtime > 0 &&
            item.runtime <= event.runtime + durationRange &&
            item.runtime >= event.runtime - durationRange))
    );

    if (movies && movies.length > 0) {
      result.push({ genres, movies });
    }
  });
  return result;
}
