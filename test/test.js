// Initialise instance of the app
require('../src/main.ts');

const chai = require('chai');
const chaiHttp = require('chai-http');

const {Card} = require('../src/db.js');

const port = 8080;
const testUrl = `http://localhost:${port}`;
const route = '/card';
const request = require('supertest')(testUrl);

chai.use(chaiHttp);

describe('API', async function () {
	beforeEach(async () => {
		// Create fresh seed data each test
		await Card.deleteMany();
		await Card.insertMany([
			{
				title: 'Foo',
				description: 'bar',
				day: ['Monday'],
				time: [9],
				tags: ['Baz']
			},
			{
				title: 'Bing',
				description: 'Bong',
				day: ['Wednesday'],
				time: [11],
				tags: ['Bang', 'Blam']
			}
		]);
	});

	describe('getCards', () => {
		it('should return a list of unfiltered cards', done => {
			request.post(route)
				.send({query: '{ getCards { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {getCards}}} = res;
					chai.expect(getCards.length).to.equal(2);

					chai.expect(getCards[0]).to.have.property('title');
					chai.expect(getCards[0]).to.have.property('description');
					chai.expect(getCards[0]).to.have.property('day');
					chai.expect(getCards[0]).to.have.property('time');
					chai.expect(getCards[0]).to.have.property('tags');

					chai.expect(getCards[0].title).to.equal('Foo');
					chai.expect(getCards[1].title).to.equal('Bing');
					done();
				})
		});

		it('should filter on title', done => {
			request.post(route)
				.send({query: '{ getCards(title: "Foo") { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {getCards}}} = res;
					chai.expect(getCards.length).to.equal(1)
					chai.expect(getCards[0].title).to.equal('Foo');
					done();
				});
		});

		it('should filter on description', done => {
			request.post(route)
				.send({query: '{ getCards(description: "bar") { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {getCards}}} = res;
					chai.expect(getCards.length).to.equal(1)
					chai.expect(getCards[0].title).to.equal('Foo');
					done();
				});
		});

		it('should filter on tags', done => {
			request.post(route)
				.send({query: '{ getCards(tags: "Blam") { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {getCards}}} = res;
					chai.expect(getCards.length).to.equal(1)
					chai.expect(getCards[0].title).to.equal('Bing');
					done();
				});
		});
	});

	describe('postCard', () => {
		it('should create a new card and then return it', done => {
			request.post(route)
				.send({query: 'mutation { postCard(title: "New", day: ["Friday"]) { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {postCard}}} = res;
					chai.expect(postCard).to.have.property('title');
					chai.expect(postCard).to.have.property('description');
					chai.expect(postCard).to.have.property('day');
					chai.expect(postCard).to.have.property('time');
					chai.expect(postCard).to.have.property('tags');

					chai.expect(postCard.title).to.equal('New');
					chai.expect(postCard.day).to.include('Friday');
					done();
				})
		});
	});

	describe('patchCard', () => {
		it('should modify new card and then return it', done => {
			request.post(route)
				.send({query: 'mutation { patchCard(oldTitle: "Foo", newTitle: "New", day: ["Friday"]) { title day }}'})
				.end((_, res) => {
					const {body: {data: {patchCard}}} = res;
					chai.expect(patchCard).to.have.property('title');
					chai.expect(patchCard).to.not.have.property('description');
					chai.expect(patchCard).to.have.property('day');
					chai.expect(patchCard).to.not.have.property('time');
					chai.expect(patchCard).to.not.have.property('tags');

					chai.expect(patchCard.title).to.equal('New');
					chai.expect(patchCard.day).to.include('Friday');
					done();
				})
		});
	});

	describe('putCard', () => {
		it('should replace a card and then return it', done => {
			request.post(route)
				.send({query: 'mutation { putCard(oldTitle: "Foo", newTitle: "New", day: ["Friday"], tags: ["TestTag"]) { title description day time tags }}'})
				.end((_, res) => {
					const {body: {data: {putCard}}} = res;
					chai.expect(putCard).to.have.property('title');
					chai.expect(putCard).to.have.property('description');
					chai.expect(putCard).to.have.property('day');
					chai.expect(putCard).to.have.property('time');
					chai.expect(putCard).to.have.property('tags');

					chai.expect(putCard.title).to.equal('New');
					chai.expect(putCard.day).to.include('Friday');
					chai.expect(putCard.tags).to.include('TestTag');
					done();
				})
		});
	});

	describe('delCard', () => {
		it('should delete a card', done => {
			request.post(route)
				.send({query: 'mutation { delCard(title: "Foo") { success }}'})
				.end((_, res) => {
					const {body: {data: {delCard}}} = res;
					
					chai.expect(delCard.success).to.equal(true);

					done();
				})
		});
	});
});