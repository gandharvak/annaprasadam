const customer = require("../models/customer");
const owner = require("../models/owner");
const jwt = require('jsonwebtoken');
let secret_key = "secret-key";
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


//User Creation Module
exports.signup = async (req, res) => {
    try {
        if (isValid(req.body.name, req.body.email, req.body.password)) {
            data = await customer.findOne({ email: req.body.email });
            if (data != null) {
                res.send({ error: true, message: `User with Email Id- ${req.body.email} already exists` });
                return;
            }

            if (req.body.role === "customer") {
                const custInstance = new customer({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    ratedMess: ""
                });
                await custInstance.save();
                // console.log("user added");
                data = {
                    time: Date(),
                    name: req.body.name,
                    email: req.body.email
                }
                const token = jwt.sign(data, secret_key);
                res.send({ error: false, "auth_token": token });
            }
            else {
                data = await owner.findOne({ email: req.body.email });
                if (data != null) {
                    res.send({ error: true, message: `User with Email Id- ${req.body.email} already exists` });
                    return;
                }
                const ownerInstance = new owner({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    description: "",
                    location: "",
                    menu: "",
                    address: "",
                    price: "",
                    rating: 0,
                    review: []
                })
                data = await ownerInstance.save();
                // console.log("user added");
                data = {
                    time: Date(),
                    name: req.body.name,
                    email: req.body.email
                }
                const token = jwt.sign(data, secret_key);
                res.send({ error: false, "auth_token": token });
            }
        }
        else {
            res.send({ error: true, message: "Please fill the form properly!" });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ error: "true", message: "An error occurred" });
    }
}


//Login Module
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (req.body.role === "customer") {
            customer.findOne({ email: email, password: password }).then((data) => {
                if (data) {
                    const token_data = {
                        time: Date(),
                        name: data.name,
                        email: data.email
                    };
                    const token = jwt.sign(token_data, secret_key);
                    res.send({ error: false, "auth_token": token, "role": "customer" });
                } else {
                    res.send({ error: true, message: "Invalid Credentials" });
                }
            });
        }
        else {
            owner.findOne({ email: email, password: password }).then((data) => {
                if (data) {
                    const token_data = {
                        time: Date(),
                        name: data.name,
                        email: data.email
                    };
                    const token = jwt.sign(token_data, "secret-key");
                    res.send({ error: false, "auth_token": token, "role": "owner" });
                } else {
                    res.send({ error: true, message: "Invalid Credentials" });
                }
            });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
}