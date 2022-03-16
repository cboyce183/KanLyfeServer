const Koa = require("koa");
const Router = require("koa-router");
const {graphqlHTTP} = require("koa-graphql");
const {initDB} = require("./db.js");
const {gqlCardSchema} = require("./gql/schema.js");
const {cardResolver} = require('./gql/resolvers.js');

require('dotenv').config()
const port = process.env.port || 8080;

initDB();

const app = new Koa();
const router = new Router();

// Route to handle basic queries
router.all('/card', graphqlHTTP({
	schema: gqlCardSchema,
	graphiql: true,
	rootValue: cardResolver
}))

// Boilerplate setup
app.use(router.routes())
	.use(router.allowedMethods());

app.listen(port, () => console.log(`listening at port ${port}`));

// This is NOT good, but will do while I get tests up and running properly
if (!module.parent) {
	module.exports = app.listen(port, () => console.log(`listening at port ${port}`));
}
