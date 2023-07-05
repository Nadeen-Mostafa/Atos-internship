const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const userRouter = require("./routes/user-routes");

const HttpError = require("./models/http-error");

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*" , );
    res.setHeader("Access-Control-Allow-Headers", "Origin , X-Requested-With , Content-Type, Accept , Authorization");
    res.setHeader("Access-Control-Allow-Methods" , "GET,POST");
    next();
});
app.use("/api/users", userRouter);

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
// });

mongoose.connect("mongodb+srv://User_1:User_1@cluster0.l5tb3zf.mongodb.net/DBusers?retryWrites=true&w=majority")
    .then(() => {
        app.listen(4000)
    })
    .catch(err => {
        console.log(err);
    })
// app.listen(3000);