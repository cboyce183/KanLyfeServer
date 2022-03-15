const {Card} = require("../db.js");

const getCardResolver = {
	card: ({title}) => Card.findOne({title}),
	cards: _ => Card.find()
}

const postCardResolver = {
	card: async ({title, description, day, time, tags}) => {
		try {
			const newCard = new Card({title, description, day, time, tags});
			const savedCard = newCard.save();
			return savedCard;
		} catch(err) {
			return {error: true, code: err.code};
		}
	}
}

module.exports = {
	getCardResolver,
	postCardResolver
}