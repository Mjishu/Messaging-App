const express = require('express');
const router = express.Router();

const messaageController = require("../controllers/messageController")

router.post("/create", messaageController.message_create);

router.get("/all", messaageController.message_find_all);

router.get("/:id", messaageController.message_find);

router.put("/:id/update", messaageController.message_update);

router.delete("/:id/delete", messaageController.message_delete);

module.exports = router;
