# KanLyfeServer

A toy project using graphql, react, mongoDB for personal use.

If for some reason you want to copy or use anything here, go right ahead.

You will need your own mongo atlas cluster and to point toward its in `db.js` if you wish to use this locally. Otherwise, just `npm i` on the root and `npm start`, you should be good to go. Tests are run from the root after installing and `npm test`.

----
Example query structure

```
{
  getCards(title: "Relax") {
    title
    description
  	day
    time
    tags
  }
}

```
returns
```
{
	getCards: [
		{
			title: "Relax",
			description: "Put your feet up",
			day: ["Saturday", "Sunday"],
			time: [],
			tags: ["Chill"]
		}
	]
}
```
----

A mutation:

```
mutation {
  postCard(title: "Visit Alice", description: "Visit my friend Alice", days: ["Monday"], time: [19], tags: ["Social"]) {
    title
    description
  	day
    time
    tags
  }
}

```
creates and returns 
```
{
	postCard: [
		{
			title: "Visit Alice",
			description: "Visit my friend Alice",
			day: ["Monday"],
			time: [19],
			tags: ["Social"]
		}
	]
}
```