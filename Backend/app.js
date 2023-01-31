if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const port = 5000;
const express = require("express");
const connectMongoose = require("./connectMongoose.js");
const cors = require("cors");

connectMongoose();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("hello");
});

app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));

app.use((err, req, res, next) => {
    const { status = 500, message = "Internal Server Error" } = err;
    res.status(status).json({ success: false, error: message });
});

app.listen(port, () => {
    console.log(`Meet you at port http://localhost:${port}`);
});
