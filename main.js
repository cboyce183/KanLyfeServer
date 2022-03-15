const Koa = require("koa");
const Router = require("koa-router");
const {graphqlHTTP} = require("koa-graphql");
const {initDB} = require("./db.js");
const {gqlCardSchema} = require("./gql/schema.js");
const {getCardResolver, postCardResolver} = require('./gql/resolvers.js');

require('dotenv').config()
const port = process.env.port || 8080;

initDB();

const app = new Koa();
const router = new Router();

// Route to handle basic queries
router.all('/query', graphqlHTTP({
	schema: gqlCardSchema,
	graphiql: true,
	rootValue: getCardResolver
}))

// Route to handle any mutations
router.all('/mutate', graphqlHTTP({
	schema: gqlCardSchema,
	graphiql: true,
	rootValue: postCardResolver
}))

// Boilerplate setup
app.use(router.routes())
	.use(router.allowedMethods());

app.listen(port, () => console.log(`listening at port ${port}`));

// Lots to do, still super basic but functional
// npm start from root directory, will need to change the 