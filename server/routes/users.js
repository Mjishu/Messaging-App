var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController")

router.post("/create", userController.user_create);

router.get("/:id", userController.user_find);

router.put("/:id/update", userController.user_update)

router.delete("/:id/delete", userController.user_delete)

module.exports = router;
