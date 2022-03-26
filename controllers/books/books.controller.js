const Books = require("../../models/books/books.model");
const { body, validationResult } = require('express-validator/check');

exports.fetch = async (req, res) => {
    var { page = 1, limit = 10 } = req.query;

    //get data 
    const data = await Books.find()
    .sort({created_at: -1})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
    .then((data) => {
        res.status(200).send({
            status: true,
            data: data,
            message: "Data book retrieved successfully.",
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
    const response = await Books.findById(req.params.id)
    .then((data) => {
        if(data){
            res.status(200).send({
                status: true,
                data: data,
                message: "Data book retrieved successfully.",
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

    //save data 
    req.body.created_at = Date.now()
    const response = await new Books(req.body).save()
    .then((data) => {
        res.status(200).send({
            status: true,
            data: data,
            message: "Data book saved successfully."
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: false,
            data: null,
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

exports.update = async (req, res) => {
    const exists = await Books.findById(req.params.id);

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
    const response = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
        if(data) {
            res.status(200).send({
                status: true,
                data: data,
                message: "Data book updated successfully.",
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
    const response = Books.findByIdAndRemove(req.params.id)
    .then((data) => {
        if(data) {
            res.status(200).send({
                status: true,
                data: data,
                message: "Data book deleted successfully.",
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
          body('book_number', 'Book Number is required').exists(),
          body('book_title', 'Book Title is required').exists(),
          body('author', 'Author is required').exists(),
          body('publication_year', 'Publication Year is required').exists(),
          body('publisher', 'Publisher is required').exists()
        ]   
      }
      case 'update': {
        return [ 
          body('book_number', 'Book Number is required').exists(),
          body('book_title', 'Book Title is required').exists(),
          body('author', 'Author is required').exists(),
          body('publication_year', 'Publication Year is required').exists(),
          body('publisher', 'Publisher is required').exists()
        ]   
      }
    }
}