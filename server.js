const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

//importing the model
const Food = require("./models/foods.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev"));


//GET
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//get food
app.get("/food", async (req, res)=>{
const allFood = await Food.find();
res.render("food/index.ejs",{Food: allFood});
});

//creating new food
//get new food
app.get("/food/new", async (req, res)=>{
    res.render("new.ejs");
});

//show route
app.get("/food/:foodId", async (req, res)=>{
    const foundFood = await Food.findById(req.params.foodId);
    res.render("show.ejs", {food: foundFood});
});

//post the new food
app.post("/food", async (req, res) => {
 await Food.create(req.body);
    res.redirect("/food/new");
  });

  //delete food
  app.delete("/food/:foodId", async (req, res) => {
    await Food.findByIdAndDelete(req.params.foodId);
    res.redirect("/food");
  });

  //edit food 
  app.get("/food/:foodId/edit", async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId);
    res.render("edit.ejs", {food: foundFood});
  });

//update the food 
app.put("/food/:foodId", async (req, res) => {
  
    await Food.findByIdAndUpdate(req.params.foodId);
    res.redirect(`/food/${req.params.foodId}`);
  });
  
app.listen(9000, () => { 
    console.log("Listening on port 9000");
});