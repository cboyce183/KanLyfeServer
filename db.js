const mongoose = require('mongoose');
const { Schema } = mongoose;

const initDB = test => {
	const mongoAtlasUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@base-cluster-1.6mcfp.mongodb.net/${test ? 'KanLyfe-test' : process.env.DB_NAME}?retryWrites=true&w=majority`;
	mongoose.connect(mongoAtlasUrl);
	return mongoAtlasUrl;
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