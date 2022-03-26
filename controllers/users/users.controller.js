const Users = require("../../models/users/users.model");
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

exports.fetch = async (req, res) => {
    var { page = 1, limit = 10 } = req.query;

    //get data 
    const data = await Users.find()
    .sort({created_at: -1})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
    .then((data) => {
        res.status(200).send({
            status: true,
            data: data,
            message: "Data user retrieved successfully.",
            page:page,
            limit:limit,
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: false,
            data:null,
            message: err.message || "Some error occurred while retrieving data."
        });
    });
},

exports.show = async (req, res) => {
    const response = await Users.findById(req.params.id)
    .then((data) => {
        if(data){
            res.status(200).send({
                status: true,
                data: data,
                message: "Data user retrieved successfully.",
            });
        }else{
            res.status(200).send({
                status: true,
                data: data,
                message:"Data not found."
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            status: false,
            data:null,
            message: err.message || "Some error occurred while retrieving data.",
        });
    });
},

exports.create = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
        res.status(422).send({ 
            status:false,
            message: errors.array(),
            data:null 
        });
        return;
    }

    //check email
    var user = await Users.findOne({email:req.body.email});
    if(user){
        res.status(200).send({
            status: false,
            data: null,
            message: "Users already exists."
        });
    }else{
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = encryptedPassword;

        //save data 
        req.body.created_at = Date.now()
        const response = await new Users(req.body).save()
        .then((data) => {
            res.status(200).send({
                status: true,
                data: data,
                message: "Data user saved successfully."
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: false,
                data: null,
                message: err.message || "Some error occurred while retrieving data."
            });
        });
    }
};

exports.update = async (req, res) => {
    const exists = await Users.findById(req.params.id);

    if(!exists){
        res.status(200).send({ 
            status: false,
            message: "Data not found.",
            data: null
        })
    }

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req); 
  
    if (!errors.isEmpty()) {
        res.status(422).send({ 
            status:false,
            errors: errors.array(),
            data:null 
        });
        return;
    }

    //update data
    req.body.updateAt = Date.now()
    const response = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
        if(data) {
            res.status(200).send({
                status: true,
                data: data,
                message: "Data user updated successfully.",
            });
        }else{
            res.status(500).send({
                status: false,
                data:null,
                message: "Data not found.",
            });
        }
    })
    .catch((err) => {
        return res.status(500).send({
            status: false,
            data:null,
            message: err.message || "Some error occurred while updating data.",
        });
    });
}

exports.destroy = (req, res) => {
    const response = Users.findByIdAndRemove(req.params.id)
    .then((data) => {
        if(data) {
            res.status(200).send({
                status: true,
                data: data,
                message: "Data user deleted successfully.",
            });
        }else{
            res.status(500).send({
                status: false,
                data:null,
                message: "Data not found.",
            });
        }
    })
    .catch((err) => {
        return res.status(500).send({
            status: false,
            data:null,
            message: err.message || "Some error occurred while destroying data.",
        });
    });
}

exports.validate = (method) => {
    switch (method) {
      case 'store': {
        return [ 
          body('full_name', 'Full Name is required').exists(),
          body('address', 'Address is required').exists(),
          body('email', 'Email is required').exists().isEmail(),
          body('password', 'Password is required').exists()
        ]   
      }
      case 'update': {
        return [ 
            body('full_name', 'Full Name is required').exists(),
            body('address', 'Address is required').exists()
        ]   
      }
    }
}