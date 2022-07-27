const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		
	},
	lastName: {
		type: String,
		
	},
	ID: {
		type: Number,
		
	},
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: String,
		
	},
	PhoneNumber: {
		type: String,
		
	},
	Password: {
		type: String,
		required: true,
	},
	accountType:{
		type:String,
		
	},
	userRole: {
		type: String,
		required: true,
	},
	status :{
		type:String,
		
	},


});

module.exports = User = mongoose.model("user", UserSchema);