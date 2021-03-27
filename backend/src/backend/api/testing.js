/** Get Request **/
// reservationsRouter.get("/", async (req, res) => {
//   try {
//     let data;
//     if (req.query.id) {
//       data = await knex("meal_reservation").where({
//         id: req.query.id,
//       });
//     } else {
//       data = await knex("meal_reservation");
//     }

//     data.length == 0
//       ? res.send(`<h1 style = color:red> Reservations not Founded </h1>`)
//       : console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

/** Get Request **/
// mealRouter.get("/", async (req, res) => {
//   try {
//     let data;
//     if (req.query.id) {
//       data = await knex("meal").where({
//         id: req.query.id,
//       });
//     } else {
//       data = await knex("meal");
//     }
//     data.length == 0
//       ? res.send(`<h1 style = color:red> Meal not Founded </h1>`)
//       : console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });
