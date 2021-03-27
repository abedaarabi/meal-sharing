const express = require("express");
const knex = require("../database");
const reservationsRouter = express.Router();

reservationsRouter.get("/:mealId", async (req, res) => {
  try {
    const data = await knex("meal_reservation").where({
      mealId: req.params.mealId,
    });

    res.json(data);
  } catch (error) {
    throw error;
  }
});

/** Put Request **/
reservationsRouter.put("/", async (req, res) => {
  try {
    const boolean = Boolean(req.body.reservations);
    const data = await knex("meal_reservation")
      .where({ id: req.body.id })
      .update({ reservations: boolean });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Delete Request **/
reservationsRouter.delete("/", async (req, res) => {
  try {
    const data = await knex("meal_reservation")
      .where({ id: req.query.id })
      .del();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Post Request **/
reservationsRouter.post("/", async (req, res) => {
  try {
    const reservation = await knex("meal_reservation").insert({
      phonenumber: req.body.phonenumber,
      name: req.body.name,
      email: req.body.email,
      id: req.body.id,
      mealId: req.body.mealId,
    });
    res.json(reservation);
  } catch (error) {
    console.log("helloee", error);
    res.send(error);
  }
});
module.exports = reservationsRouter;
