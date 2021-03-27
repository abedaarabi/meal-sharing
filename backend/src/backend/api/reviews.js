const express = require("express");
const knex = require("../database");
const reviewsRouter = express.Router();

/** Get Request **/
reviewsRouter.get("/", async (req, res) => {
  try {
    let data;
    if (req.query.id) {
      data = await knex("meal").where({
        id: req.query.id,
      });
    } else {
      data = await knex("meal");
    }

    data.length == 0
      ? res.send(`<h1 style = color:red> Reservations not Founded </h1>`)
      : console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Put Request **/
reviewsRouter.put("/", async (req, res) => {
  try {
    const data = await knex("meal")
      .where({ id: req.query.id })
      .update({ reviews: req.query.reviews });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Delete Request **/
reviewsRouter.delete("/", async (req, res) => {
  try {
    const data = await knex("meal").where({ id: req.query.id }).del();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Post Request **/
reviewsRouter.post("/", async (req, res) => {
  try {
    const number = parseInt(req.body.reviews);
    const newReviews = await knex("meal").insert({
      id: req.body.id,
      reviews: number,
    });
    res.json(newReviews);
  } catch (error) {
    console.log(error);
  }
});
module.exports = reviewsRouter;
