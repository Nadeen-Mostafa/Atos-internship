const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    // creatorID: { type: mongoose.Types.ObjectId, required: true, ref: "question" },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    userType: { type: String, required: true }
});





userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
