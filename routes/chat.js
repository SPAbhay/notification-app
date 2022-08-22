const chatController = require("../controllers/chat.controller");
const jwtMiddleware = require("../middleware/verifyJwt.middleware");
const express = require("express");
const router = express.Router();

router.route("/getChatHistory").get(jwtMiddleware.verifyJwt, chatController.getChatHistory);

module.exports = router;