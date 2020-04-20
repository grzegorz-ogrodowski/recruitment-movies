import express from "express";
import bodyParser from "body-parser";

const routes = require("./routes/routes");
const database = require("./database/service");

const app = express();
const port = process.env.PORT || 8001;

database.useDatabase();

app.use(bodyParser.json({ type: "application/json" }));
app.use("/", routes);
app.listen(port);

console.log("MoviesAPI listens on port:" + port);
