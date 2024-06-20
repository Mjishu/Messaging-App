const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")

router.post("/create", userController.user_create);

router.post("/login", userController.user_sign_in)

router.get("/all", userController.user_find_all)

router.get("/find/:id", userController.user_find);

router.put("/find/:id/update", userController.user_update)

router.delete("/find/:id/delete", userController.user_delete)
router.get("/current", userController.signed_in_user) //! this gives me a 500 error?
router.get("/logout", userController.user_sign_out)

module.exports = router;

