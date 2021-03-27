const express = require("express");
// const fileUpload = require("express-fileupload");
const app = express();

// default options

// Routers
const mealRouter = require("./api/meal.js");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
//Port
const port = process.env.PORT || 5000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.static("upload"));
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const cors = require("cors");

// Use this after the variable declaration
app.use(cors());

app.use("/", mealRouter);
app.use("/reservations", reservationsRouter);
app.use("/reviews", reviewsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
