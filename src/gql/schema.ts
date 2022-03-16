const {buildSchema} = require("graphql");


/**
 * gqlCardSchema
 * The main schema describing how cards are queried and mutated. Also confirmation object bundled in for brevity.
 * @constructor
 * @returns {obj} - the formatted graphql schema
 */
export const gqlCardSchema = buildSchema(`
	type Query {
		getCards(title: String, description: String, tags: String): [Card!]!
	}
	type Mutation {
		postCard(title: String!, description: String, day: [String!]!, time: [Int!], tags: [String!]): Card!
		patchCard(oldTitle: String!, newTitle: String!, description: String, day: [String!]!, time: [Int!], tags: [String!]): Card!
		putCard(oldTitle: String!, newTitle: String!, description: String, day: [String!]!, time: [Int!], tags: [String!]): Card!
		delCard(title: String!): Confirmation!
	}
	type Card {
		title: String!
		description: String
		day: [String!]!
		time: [Int!]
		tags: [String!]
	}
	type Confirmation {
		success: Boolean!
	}
`);