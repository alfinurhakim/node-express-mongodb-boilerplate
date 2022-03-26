const Users = require("../../models/users/users.model");
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req); 
  
    if (!errors.isEmpty()) {
        res.status(422).json({ 
            status:false,
            errors: errors.array(),
            data:null 
        });
        return;
    }

    // Validate if user exist in our database
    const data = await Users.findOne({ email: req.body.email });

    if (data && (await bcrypt.compare(req.body.password, data.password))) {
        try {
            // set jwt sign
            jwt.sign(
                { id: data._id, email: data._email, full_name: data.full_name},
                "randomString", {
                    expiresIn: "1 days"
                },
                async (err, token) =>  {
                    if (err) throw err;

                    // update user token
                    data.token = token
                    await data.save();

                    res.status(200).send({
                        status: true,
                        message: "Login successfully",
                        data: {
                            full_name:data.full_name,
                            email:data.email,
                            token:token
                        }
                    });  
                }
            );
        }catch (err) {
            res.status(500).send({
                status: false,
                message: "Error in generating token",
                data: err,
            });
        }
    } else {
        res.status(200).send({
            status: false,
            message: "Email Or Password is incorrect",
            data: null
        });
    }
}

exports.logout = async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const result = await Users.update({_id: req.detail_users._id},{$set: {
            token:null,
            updated_at:Date.now()
        }});

        res.status(200).send({
          status:true,
          message: "Logout Successfully",
          data: null,
      });
    } catch (e) {
        res.send({
            status:false,
            message: "Error in Fetching user",
            data: e,
        });
    }
}

exports.validate = (method) => {
    switch (method) {
      case 'login': {
        return [ 
          body('email', 'Email is required').exists().isEmail(),
          body('password', 'Password is required').exists()
        ]   
      }
    }
}   