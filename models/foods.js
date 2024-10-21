const mongoose = require('mongoose');

//creating the schema
const foodSchema = new mongoose.Schema({
    name: String,
    Discription: String,
    cuisine: String,
});

// creating the model
const Food = mongoose.model("Food", foodSchema);

module.exports = Food;