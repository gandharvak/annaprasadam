const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require("cors")
const app = express()
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://gandharvakulkarni2003:ru3kBHHOzGi2rsJR@cluster0.2kyijgx.mongodb.net/annaprasadam");
const customer = require("./models/customer");
const owner = require("./models/owner");
const userRoutes = require("./routes/UserRoutes");

let port = 5000;
let secret_key = "secret-key";
// parse application/json
app.use(bodyParser.json())
app.use(cors());

//Validation Function
function isValid(name, email, password) {
    let valid = true;
    if (name.length < 2 || name.length > 40) {
        valid = false;
    } else if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) == -1) {
        valid = false;
    }
    else if (password.length < 8) {
        valid = false;
    }
    return valid;
}


app.get('/', (req, res) => {
    res.send('Welcome this is the home endpoint');
})


// Defining API's
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Backend is Listening on Port ${port}...`)
})
