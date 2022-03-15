const {buildSchema} = require("graphql");

const gqlCardSchema = buildSchema(`
	type Query {
		cards: [Card!]!
		card(title: String): Card!
	}
	type Mutation {
		card(title: String!, description: String, day: [String!]!, time: [Int!], tags: [String!]): Card!
	}
	type Card {
		title: String!
		description: String
		day: [String!]!
		time: [Int!]
		tags: [String!]
	}
`);

module.exports = {
	gqlCardSchema
}