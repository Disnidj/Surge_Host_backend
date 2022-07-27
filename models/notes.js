const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
	Title: {
		type: String,
		required: true,
	},
	Description: {
		type: String,
        required: true,
		
	},
	


});

module.exports = User = mongoose.model("note", NoteSchema);