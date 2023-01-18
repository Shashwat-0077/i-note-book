const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { detectError } = require("../utils/detectError");
const router = express.Router();
const { validateRegUser, validateLogUser } = require("../utils/JoiSchema");
const fetchUser = require("../middleware/fetchUser");

const User = require("../models/user");
const jwtSecret = process.env.JWT_SECRET;

router.post(
    "/register",
    validateRegUser,
    detectError(async (req, res, next) => {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).send("Email is already in use");

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: secPass });
        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const authToken = jwt.sign(data, jwtSecret);
        res.json({ authToken });
    })
);

router.post(
    "/login",
    validateLogUser,
    detectError(async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ error: "Please Enter correct credentials" });
        }

        const isRealUser = await bcrypt.compare(password, user.password);

        if (!isRealUser) {
            return res
                .status(400)
                .json({ error: "Please Enter correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
            },
        };
        console.log(jwtSecret);
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ authToken });
    })
);

router.post(
    "/getUser",
    fetchUser,
    detectError(async (req, res, next) => {
        const { id: userID } = req.user;
        const user = await User.findById(userID).select("-password");
        res.json(user);
    })
);

module.exports = router;
