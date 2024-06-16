const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")

router.post("/create", userController.user_create);

router.get("/all", userController.user_find_all)

router.get("/:id", userController.user_find);

router.put("/:id/update", userController.user_update)

router.delete("/:id/delete", userController.user_delete)

module.exports = router;
