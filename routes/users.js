var express = require('express');
var router = express.Router();

// require controller
const controller = require("../controllers/users/users.controller");

router.get("/", controller.fetch);
router.post("/", controller.validate('store'), controller.create);
router.get("/:id", controller.show);
router.put("/:id", controller.validate('update'), controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;