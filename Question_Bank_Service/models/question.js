const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    mark: { type: Number, required: true },
    expextedTime: { type: Number, required: true },
    correctAnswers: [{ type: Number, required: true }],  //array of ids
    createdBy: { type: mongoose.Types.ObjectId, required: true ,ref:"User" },
    createdAt: { type: Date, required: true },
    answers: [{

        name: { type: String, required: true },
        description: { type: String, required: true }
    }],
})

module.exports = mongoose.model("question", questionSchema)