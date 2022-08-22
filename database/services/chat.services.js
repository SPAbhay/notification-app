const ChatModel = require("../models/chat");
const { Mongoose, SchemaType } = require("mongoose");

const create = async (createObj) => {
	let userData = await ChatModel.create(createObj);
	return userData;
};

/**
 * 
 * @param {{page:string, limit:string}} obj 
 * @returns 
 */
const find = async (obj) => {
	let page = parseInt(obj.page);
	let limit = parseInt(obj.limit);
	let skip = (page-1)*limit;

	let getData = await ChatModel.find().limit(limit).skip(skip);
	return getData;
};


const findById = async (id) => {
	let getData = await ChatModel.findById(id);
	return getData;
};



const findByEmail = async (email) => {
	let getData = await ChatModel.findOne({ email: email });
	return getData;
};

const findByRecieverEmail = async (email) => {
	let getData = await ChatModel.find({ send_to: email });
	return getData;
};



/**
 * 
 * @param {{id:mongoId, data:obj}} data 
 * @returns 
 */
const updateData = async (data) => {
	const updatedData = await ChatModel.findByIdAndUpdate(data.id, data.data, { new: true });
	return updatedData;
};


const deleteUser = async (id) => {
	const updatedData = await ChatModel.findByIdAndUpdate(id, { isActive: config.dbCode.inActive_by_admin });
	return updateData;
}



module.exports = {
	create,
	find,
	findById,
	updateData,
	deleteUser,
	findByEmail,
	findByRecieverEmail
};