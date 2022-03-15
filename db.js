const mongoose = require('mongoose');
const { Schema } = mongoose;

const initDB = () => {
	const mongoAtlasUrl = 'mongodb+srv://cboyce183:Mdb22-csb93@base-cluster-1.6mcfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	mongoose.connect(mongoAtlasUrl);
}

const cardSchema = new Schema({
	title: {type: String, unique: true},
	description: String,
	day: [String],
	time: [Number],
	tags: [String]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = {
	initDB,
	Card
}