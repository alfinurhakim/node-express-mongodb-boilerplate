const jwt = require("jsonwebtoken");
const Users = require("../models/users/users.model")

module.exports = async function(req, res, next) {
    const token = req.header("Authorization").split(" ")[1];
    const users = await Users.findOne({
        token_client: token
    });
    
    // if token does not exist 
    if (!token) return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: null,
    });

    // if token is not valid
    try {
        if (!token) {
            res.status(500).send({
                status: false,
                message: "Unauthorized",
                data: null,
            });
        }

        //parse data
        const decoded = jwt.verify(token, "randomString");
        req.detail_users = users;
        req.token = token;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).send({
            status: false,
            message: "Unauthorized",
            data: null,
        });
    }
};