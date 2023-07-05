const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    mark: { type: Number, required: true },
    expextedTime: { type: Number, required: true },
    correctAnswers: { type: String, required: true },  //array of ids
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true },
    answers:
        { type: Object, required: true }

    ,
})

module.exports = mongoose.model("question", questionSchema)