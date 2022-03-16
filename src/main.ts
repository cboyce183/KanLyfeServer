const Koa = require("koa");
const Router = require("koa-router");
const {graphqlHTTP} = require("koa-graphql");
const {initDB: DB} = require("./db.ts");
const {gqlCardSchema} = require("./gql/schema.ts");
const {cardResolver} = require('./gql/resolvers.ts');

require('dotenv').config()
const port = process.env.port || 8080;

// Initialise DB
DB();

// Set up simple Koa server
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