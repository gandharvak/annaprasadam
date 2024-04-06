const express = require("express");

// Router Import
const router = express.Router();

const { updateMenu, updateOwner, findMenu, allMenu, getHotel, getOwner, getCustomer, getMenu, rateMess, checkRate, getReviews } = require("../controllers/UserController");

const { signup, login } = require("../controllers/AuthController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/update-owner", updateOwner);

router.post("/update-menu", updateMenu);

router.post("/find-menu", findMenu);

router.post("/all-menu", allMenu);

router.post("/get-hotel", getHotel);

router.post("/get-owner", getOwner);

router.post("/get-customer", getCustomer);

router.post("/get-menu", getMenu);

router.post("/rate-mess", rateMess);

router.post("/check-rate", checkRate);

router.post("/get-reviews", getReviews);


module.exports = router;