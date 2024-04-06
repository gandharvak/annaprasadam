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


//Updating Owner
exports.updateOwner = async (req, res) => {
    try {
        const data = jwt.verify(req.body.auth_token, secret_key);
        const email = data.email;
        const name = req.body.name;
        const description = req.body.description;
        const location = req.body.location;
        const address = req.body.address;
        const password = req.body.password;

        await owner.findOneAndUpdate({ email: email }, { description: description, location: location, name: name, address: address, password: password });
        res.send({ error: false, message: "Owner Updated" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const data = jwt.verify(req.body.auth_token, secret_key);
        // console.log("reached")
        const email = data.email;
        const menu = req.body.menu;
        const price = req.body.price;
        const lastUpdated = new Date();
        await owner.findOneAndUpdate({ email: email }, { menu: menu, price: price, lastUpdated: lastUpdated });
        res.send({ error: false, message: "Menu Updated" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}

//Find menu
exports.findMenu = async (req, res) => {
    try {
        const data = await owner.find({ menu: { "$regex": req.body.menu, "$options": "i" } });
        let resArray = []
        data.forEach((element) => {
            resArray.push({
                menu: element.menu,
                price: element.price,
                name: element.name,
                email: element.email,
                stars: element.rating
            });
        })
        if (data) {
            res.send({ error: "false", message: "Data found", data: resArray });
        }
        else {
            res.send({ error: "true", message: "Data not found", data: resArray });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
}

//Get all menu
exports.allMenu = async (req, res) => {
    try {
        const data = await owner.find({});
        let resArray = []
        data.forEach((element) => {
            resArray.push({
                menu: element.menu,
                price: element.price,
                name: element.name,
                email: element.email,
                stars: element.rating
            });
        })
        if (data) {
            res.send({ error: "false", message: "Data found", data: resArray });
        }
        else {
            res.send({ error: "true", message: "Data not found", data: resArray });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
}

//Get hotel
exports.getHotel = async (req, res) => {
    try {
        const data = await owner.findOne({ email: req.body.email });
        if (data) {
            res.send({
                error: "false", message: "Data found", data: {
                    name: data.name,
                    menu: data.menu,
                    price: data.price,
                    description: data.description,
                    address: data.address,
                    location: data.location,
                    stars: data.rating
                }
            });
        }
        else {
            res.send({ error: "true", message: "Data not found" });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
}

//Get owner
exports.getOwner = async (req, res) => {
    let data = jwt.verify(req.body.auth_token, secret_key);
    let email = data.email;
    // console.log(email);
    let ownerData = await owner.findOne({ email: email });
    res.send({ error: false, data: ownerData });
}

//Get Customer
exports.getCustomer = async (req, res) => {
    try {
        let data = jwt.verify(req.body.auth_token, secret_key)
        let email = data.email;
        let customerData = await customer.findOne({ email: email });
        res.send({ error: false, data: { name: customerData.name } });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}


//Get Particular Menu
exports.getMenu = async (req, res) => {
    try {
        let data = jwt.verify(req.body.auth_token, secret_key);
        let email = data.email;
        let customerData = await owner.findOne({ email: email });
        let menu = customerData.menu;
        let price = customerData.price;
        let stars = customerData.rating;
        res.send({ error: false, menu: menu, price: price, stars:stars });
    }
    catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}


// Rate Mess
exports.rateMess = async (req, res) => {
    try {
        let tokenData = jwt.verify(req.body.auth_token, secret_key);
        let ownerEmail = req.body.email;
        let custEmail = tokenData.email;
        let ownerData = await owner.findOne({ email: ownerEmail });
        let custData = await customer.findOne({email: custEmail});
        
        let review = ownerData.review;
        let reviewObj = {
            review:req.body.review, author:custData.name
        }
        
        review.push(reviewObj);
        let rating = ownerData.rating;
        rating = rating + req.body.stars;
        //console.log(req.body.stars)
        let ratedMess = custData.ratedMess+", "+ownerEmail;
        await owner.findOneAndUpdate({ email: ownerEmail }, { rating:rating, review: review});
        await customer.findOneAndUpdate({email: custEmail}, {ratedMess: ratedMess})
        res.send({ error: false, message: "Mess Rated Successfully!" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}

// Check Rate
exports.checkRate = async (req, res) => {
    try {
        let tokenData = jwt.verify(req.body.auth_token, secret_key);
        let customerEmail = tokenData.email;
        let ownerEmail = req.body.email;
        const searchData = await customer.find({email: customerEmail, ratedMess: { "$regex": ownerEmail, "$options": "i" } });
        if(searchData.length > 0){
            res.send({error: false, hasRated: true});
        }
        else{
            res.send({error: false, hasRated: false});
        }
    }
    catch(err){
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
}

//Get reviews
exports.getReviews = async (req,res)=>{
    try{
        let email = req.body.email;
        let ownerData = await owner.findOne({email:email});
        let review = ownerData.review;
        res.send({error: false, review: review})
    }
    catch(err){
        res.send({error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!"})
    }
}

