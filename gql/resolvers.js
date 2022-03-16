const {Card} = require("../db.js");
const { removeFalsyValuesFromObject } = require("./helpers.js");

// For debugging
/**
 * logError
 * Simple error logger to quickly identify resolver errors for development
 * @constructor
 * @param {err} obj - The error object
 */
const logError = err => console.error({msg: '>> Resolver error <<', error: true, code: err.code});

const cardResolver = {
	/**
	 * getCards
	 * Searches and returns from all existing cards, filterable by any field on the Card schema
	 * @constructor
	 * @param {object} obj - The query object
	 * @returns {object} - The card(s) returned from the query, or an error object
	 */
	getCards: async searchCriteria => {
		try {
			const card = await Card.find(searchCriteria);
			return card;
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},

	/**
	 * postCard
	 * Creates a new card
	 * @constructor
	 * @param {string} title - REQUIRED - The title of the card
	 * @param {string} description - The optional description
	 * @param {array} day - REQUIRED - An array of days to attach to the card - ["Monday", "Sunday"]
	 * @param {array} time - Optional time to create alerts off of, integer numbers 0 -> 24 for now
	 * @param {array} tags - Optional tags for filtering and grouping. Simple strings for now
	 * @returns {object} - the created card, or an error object
	 */
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

	/**
	 * patchCard
	 * Patches a card, altering any fields passed arguments
	 * @constructor
	 * @param {string} oldTitle - REQUIRED - The previous of the card
	 * @param {string} newTitle - REQUIRED - The new of the card (keep same as old if unchanged)
	 * @param {string} description - The optional description
	 * @param {array} day - REQUIRED - An array of days to attach to the card - ["Monday", "Sunday"]
	 * @param {array} time - Optional time to create alerts off of, integer numbers 0 -> 24 for now
	 * @param {array} tags - Optional tags for filtering and grouping. Simple strings for now
	 * @returns {object} - the updated card, or an error object
	 */
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

	/**
	 * patchCard
	 * Patches a card, altering any fields passed arguments
	 * @constructor
	 * @param {string} oldTitle - REQUIRED - The previous of the card
	 * @param {string} newTitle - REQUIRED - The new of the card (keep same as old if unchanged)
	 * @param {string} description - The optional description
	 * @param {array} day - REQUIRED - An array of days to attach to the card - ["Monday", "Sunday"]
	 * @param {array} time - Optional time to create alerts off of, integer numbers 0 -> 24 for now
	 * @param {array} tags - Optional tags for filtering and grouping. Simple strings for now
	 * @returns {object} - the updated card, or an error object
	 */
	putCard: async ({oldTitle, newTitle, description, day, time, tags}) => {
		try {
			await Card.replaceOne({title: oldTitle}, {title: newTitle, description, day, time, tags});
			return {title: newTitle, description, day, time, tags}
		} catch(err) {
			logError(err);
			return errorObj;
		}
	},

	/**
	 * del
	 * Deletes a card
	 * @constructor
	 * @param {string} title - REQUIRED - The title of the card
	 * @returns {object} - the confirmation object, or an error
	 */
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