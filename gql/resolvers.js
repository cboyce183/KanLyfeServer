const {Card} = require("../db.js");
const { removeFalsyValuesFromObject } = require("./helpers.js");

// For debugging
const logError = err => console.error({msg: '>> Resolver error <<', error: true, code: err.code});

const cardResolver = {
	// Can get all or single cards, filterable by name, description, or individual tags
	// todo: advanced filtering via multiple tags
	getCards: async searchCriteria => {
		try {
			const card = await Card.find(searchCriteria);
			return card;
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},
	postCard: async ({title, description, day, time, tags}) => {
		try {
			const newCard = new Card({title, description, day, time, tags});
			const savedCard = newCard.save();
			return savedCard;
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},
	patchCard: async ({oldTitle, newTitle, description, day, time, tags}) => {
		try {
			const optionalArguments = {description, time, tags};
			// We currently do not want to modify any arguments not included for patch operation, so remove them if falsy.
			const modifiedOptionalArguments = removeFalsyValuesFromObject(optionalArguments);
			await Card.updateOne({title: oldTitle}, {title: newTitle, day, ...modifiedOptionalArguments});
			return {title: newTitle, day, ...modifiedOptionalArguments};
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},
	putCard: async ({oldTitle, newTitle, description, day, time, tags}) => {
		try {
			await Card.replaceOne({title: oldTitle}, {title: newTitle, description, day, time, tags});
			return {title: newTitle, description, day, time, tags}
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},
	delCard: async ({title}) => {
		try {
			await Card.deleteOne({title});
			return {success: true};
		} catch(err) {
			logError(err);
			return errorObj;
		}
	}
}

module.exports = {
	cardResolver
}