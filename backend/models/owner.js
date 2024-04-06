const mongoose = require('mongoose');

const someModel = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    description: String,
    role: String,
    location: String,
    menu: String,
    address: String,
    price: String,
    lastUpdated: String,
    rating: Number,
    review: Array
});

//Taking the model name owner, which automatically creates a collection named as 'owners'
const owner = mongoose.model("owner",someModel);
module.exports = owner;