const { Schema } = require("../db");
const mongoose = require("../db");
const { SchemaTypes, SchemaType } = require("mongoose");

const ChatSchema = new Schema({
	send_to:{ type: SchemaTypes.String, required: true},
	sent_by:{ type: SchemaTypes.String, required: true},
	notification:{ type: SchemaTypes.String, required: true},
	date:{ type: SchemaTypes.Date, required: true},
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;