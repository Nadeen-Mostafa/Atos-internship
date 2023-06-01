const express=require("express");
const bodyParser=require("body-parser");
const questionsRoutes=require('./routes/questions-routes');
const mongoose = require("mongoose");

const app=express();
app.use(bodyParser.json());

app.use('/api/questions',questionsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });

  mongoose.connect("mongodb+srv://User_1:User_1@cluster0.l5tb3zf.mongodb.net/DBQuestions?retryWrites=true&w=majority")
  .then(() => {
      app.listen(5000)
  })
  .catch(err => {
      console.log(err);
  })