const mongoose = require('mongoose');

const someModel = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    role: String,
    ratedMess: String
});

//Taking the model name customer, which automatically creates a collection named as 'customers'
const customer = mongoose.model("customer",someModel);
module.exports = customer;