const axios = require("axios");
var expect = require("chai").expect;
var fs = require("fs");
const cleanData = require("./db_clean.json");

describe("Array", function () {
  function checkResponse(data, key) {
    expect(data.some((item) => (item.field = key))).to.be.true;
  }

  after(function () {
    fs.writeFile("test/db.json", JSON.stringify(cleanData, null, 4), (err) => {
      if (err) throw err;
      console.log("Database file restored");
    });
  });

  describe("Movies API tests", function () {
    it("Hello API", function (done) {
      axios.get("http://localhost:8001").then(function (response) {
        expect(response.status).to.equal(200);
      });
      done();
    });
    it("POST: empty body, should return 400 error code", function (done) {
      axios.post("http://localhost:8001/movie", {}).catch((err) => {
        expect(err.response.status).to.equal(400);
        checkResponse(err.response.data, "genres is required");
        checkResponse(err.response.data, "title is required");
        checkResponse(err.response.data, "year is required");
        checkResponse(err.response.data, "runtime is required");
        checkResponse(err.response.data, "director is required");
      });
      done();
    });
    it("POST: valid genres field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", { genres: ["Comedy", "Drama"] })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(err.response.data, "title is required");
          checkResponse(err.response.data, "year is required");
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: invalid genres field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Fake-Genre", "Drama"],
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(
            err.response.data,
            "genres at position 0 does not match any of the allowed types"
          );
          checkResponse(err.response.data, "title is required");
          checkResponse(err.response.data, "year is required");
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: valid title field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          title: "Rick & Morty",
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(err.response.data, "year is required");
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: invalid title field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          title:
            "qRcvl8UEgV8KF4yFvB8FsxWRE5Th3MvC5pWcCtVSpzdYM42Bwu7bTokbQLOC51DkJb0ZvLLZtH74tnFyOHbiPF4TTuMjMfciUFdM4bsiTXzaxuXFM8Svdhov6MyGTFMnrngXJfaRcmaNcsEgUqnn1q0ReNqjMukzLufRlrSayocPcJ9yC4I4mIg0R7gQ89qFQW6AhQbGqboSjmEdyI9b3zv6jyACmPTWwzs2VgzVeGOcVuB75ZNCto6mpCja3Tnz",
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(
            err.response.data,
            "title length must be less than or equal to 255 characters long"
          );
          checkResponse(err.response.data, "year is required");
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: valid year field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          year: 2020,
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(
            err.response.data,
            "title length must be less than or equal to 255 characters long"
          );
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: invalid year field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          year: "fake-year",
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(
            err.response.data,
            "title length must be less than or equal to 255 characters long"
          );
          checkResponse(err.response.data, "year must be a number");
          checkResponse(err.response.data, "runtime is required");
          checkResponse(err.response.data, "director is required");
        });
      done();
    });
    it("POST: valid title field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          title: "Rick & Morty",
          director: "Pete Michels",
          year: 2020,
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(err.response.data, "runtime is required");
        });
      done();
    });
    it("POST: invalid director field, should return 400 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          title: "Rick & Morty",
          year: 2020,
          director:
            "qRcvl8UEgV8KF4yFvB8FsxWRE5Th3MvC5pWcCtVSpzdYM42Bwu7bTokbQLOC51DkJb0ZvLLZtH74tnFyOHbiPF4TTuMjMfciUFdM4bsiTXzaxuXFM8Svdhov6MyGTFMnrngXJfaRcmaNcsEgUqnn1q0ReNqjMukzLufRlrSayocPcJ9yC4I4mIg0R7gQ89qFQW6AhQbGqboSjmEdyI9b3zv6jyACmPTWwzs2VgzVeGOcVuB75ZNCto6mpCja3Tnz",
        })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          checkResponse(
            err.response.data,
            "director length must be less than or equal to 255 characters long"
          );
          checkResponse(err.response.data, "runtime is required");
        });
      done();
    });
    it("POST: valid structore, should return 201 error code", function (done) {
      axios
        .post("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          title: "Rick & Morty",
          year: 2020,
          director: "Pete Michels",
          runtime: 25,
        })
        .catch((err) => {
          expect(err.response.status).to.equal(201);
        });
      done();
    });
    it("GET: valid structore, should return 204 error code", function (done) {
      axios
        .get("http://localhost:8001/movie", {
          genres: ["Comedy", "Drama"],
          runtime: 35,
        })
        .catch((err) => {
          expect(err.response.status).to.equal(200);
        });
      done();
    });
  });
});
