const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * initDB
 * Initialises and connects mongoose to an instance of mongoDB, in this case an Atlas cluster
 * defined in a .env file in the root.
 * @constructor
 * @param {boolean} test - A flag to point to a test database
 */
export const initDB = function (test: boolean): string {
	const mongoAtlasUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@base-cluster-1.6mcfp.mongodb.net/${test ? 'KanLyfe-test' : process.env.DB_NAME}?retryWrites=true&w=majority`;
	mongoose.connect(mongoAtlasUrl);
	return mongoAtlasUrl;
}

// The Card schema for mongo, more or less matches the gql query structure 1:1 for now
const cardSchema = new Schema({
	title: {type: String, unique: true},
	description: String,
	day: [String],
	time: [Number],
	tags: [String]
});

// The card model
export const Card = mongoose.model('Card', cardSchema);