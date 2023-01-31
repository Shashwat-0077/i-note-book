const Joi = require("joi");
const ExpressError = require("./ExpressError");

// to validate user while registering
const validateRegUser = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
});

//to validate user while logging in
const validateLogUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

//to validate notes while creating
const validateNote = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    tag: Joi.string(),
});

module.exports.validateRegUser = (req, res, next) => {
    let { error } = validateRegUser.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        return res.json({ success: false, error: message });
    } else {
        next();
    }
};

module.exports.validateLogUser = (req, res, next) => {
    let { error } = validateLogUser.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        return res.json({ success: false, error: message });
    } else {
        next();
    }
};

module.exports.validateNote = (req, res, next) => {
    let { error } = validateNote.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, message);
    } else {
        next();
    }
};
