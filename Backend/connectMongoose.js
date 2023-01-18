const mongoose = require("mongoose");

const connectMongoose = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(
            "mongodb://127.0.0.1:27017/iNoteBook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1"
        )
        .then(() => {
            console.log("DB is Connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectMongoose;
