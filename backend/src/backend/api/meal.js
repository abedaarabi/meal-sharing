const express = require("express");
const knex = require("../database");
const mealRouter = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/** Get Request **/
mealRouter.get("/meals", async (request, response) => {
  try {
    const data = await knex("meal");

    response.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Put Request **/
mealRouter.put("/", async (req, res) => {
  try {
    const data = await knex("meal")
      .where({ id: req.query.id })
      .update({ price: req.query.price });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Delete Request **/
mealRouter.delete("/deletemeal", async (req, res) => {
  try {
    const data = await knex("meal").where({ id: req.query.id }).del();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/** Post Request **/
mealRouter.post("/meal", upload.single("image"), async (req, res) => {
  const image = req.file;
  console.log(image, req.body);
  try {
    /**--------------------**/
    const newConcert = await knex("meal").insert({
      id: req.body.id,
      title: req.body.title,
      reviews: req.body.reviews,
      limit: req.body.limit,
      created_date: req.body.created_date,
      // reservations: req.body.reservations,
      price: req.body.price,
      imagePath: req.file.path,
    });
    res.send(image);
  } catch (error) {
    console.log(error);
  }
});
module.exports = mealRouter;

/**
 * 
 *    let imgFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "imgFile") is used to retrieve the uploaded file
    imgFile = req.files.image;
    uploadPath = __dirname + "\\..\\img\\" + imgFile.name;
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    });

 */
