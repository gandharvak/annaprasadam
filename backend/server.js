const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require("cors")
const app = express()
const mongoose = require("mongoose");
mongoose.connect("mongodb://prathamesh:prathamesh@ac-rovb9yg-shard-00-00.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-01.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-02.9fh8spg.mongodb.net:27017/2_codies?ssl=true&replicaSet=atlas-w4n73x-shard-0&authSource=admin&retryWrites=true&w=majority");
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
    console.log(`Codies Mess Backend Listening on Port ${port}...`)
})