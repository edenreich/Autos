import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;


describe('UserManagment Test', () => {
    describe('GET /user/:id', () => {
        it('it should return a user', (done) => {
            chai.request(app).get('/user/1').end((err, response) => {
                response.status.should.equal(200);
                response.text.should.equal(1);
                done();
            });
        });
    });
});