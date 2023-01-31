module.exports.detectError = (func) => {
    return function (req, res, next) {
        func(req, res, next).catch((e) => {
            console.log(e);
            return next(e);
        });
    };
};
