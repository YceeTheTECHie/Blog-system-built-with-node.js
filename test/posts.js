
const models = require("../models").Post;
const chai = require('chai');
	  expect = chai.expect;

const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)


describe('/GET posts', () => {
    it('it should Get all post with individual properties', (done) => {
        chai.request(app)
        .get('/post/all')
        .end((err, res) => {
			res.should.have.status(200);
			for(i = 0; i < res.body.length; i++){
				res.body[i].should.have.property('content');
				res.body[i].should.have.property('title');
				res.body[i].should.have.property('content');
				res.body[i].should.have.property('imageUrl');
				res.body[i].should.have.property('userId');
				res.body[i].should.have.property('categoryId');
				res.body[i].should.have.property('createdAt');
				res.body[i].should.have.property('updatedAt');
			}
            done();
        });
    });
});



describe('/GET posts', () => {
    it('All post properties are in their correct datatypr', (done) => {
        chai.request(app)
        .get('/post/all')
        .end((err, res) => {
			res.should.have.status(200);
			for(i = 0; i < res.body.length; i++){
				res.body[i].should.have.property('content').that.is.a('string');
				res.body[i].should.have.property('title').that.is.a('string');
				res.body[i].should.have.property('imageUrl').that.is.a('string');
				res.body[i].should.have.property('userId').that.is.a('Number');
				res.body[i].should.have.property('categoryId').that.is.a('Number');
				res.body[i].should.have.property('createdAt').that.is.a('string');
				res.body[i].should.have.property('updatedAt').that.is.a('string');
			}
            done();
        });
    });
});

