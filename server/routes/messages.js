const express = require('express');
const router = express.Router();

const messageController = require("../controllers/messageController")

router.post("/create", messageController.message_create);

router.post("/:messageid/send-message", messageController.message_append)

router.get("/all", messageController.message_find_all);

router.get("/user/:id", messageController.message_find);

router.get("/:id", messageController.open_message)

router.put("/:id/update", messageController.message_update);

router.delete("/delete/:id", messageController.message_delete);

module.exports = router;
