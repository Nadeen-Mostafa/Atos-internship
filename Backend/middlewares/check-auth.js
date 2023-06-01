const HttpError = require("../models/http-error");
const jwt=require("jsonwebtoken");
module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("authantication invalid")
        }
        const decodeToken=jwt.verify(token,"supersecrets");
        req.userData={userId: decodeToken.userId};
        next();
    }
    catch (err) {
        const error = new HttpError("Authantications error", 401);
        next(error);
    }
}