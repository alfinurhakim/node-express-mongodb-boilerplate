var express = require('express');
var router = express.Router();
const authentication = require("../middleware/AuthClient");

// require controller
const controller = require("../controllers/authentication/authentication.controller");

router.post("/login", controller.validate('login'), controller.login);
router.post("/logout", authentication, controller.logout);

module.exports = router;