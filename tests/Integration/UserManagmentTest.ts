import chai from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'https';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const baseURI = "http://localhost:3000";

describe('UserManagment Test', () => {
    describe('GET /users/:id', () => {
        it('it should return a user', async () => {
            let response = await chai.request(baseURI).get('/users/1');

            response.status.should.equal(200);
            expect(Object.keys(response.body).length).to.equal(4);
        
        });
    });

    describe.only('DELETE /users/delete', () => {
        it('it does not let to delete a user if a user has an inquiry', async () => {
            // Create an inquiry for the first user.
            let response = await chai.request(baseURI)
                                    .post('/inquiries/create')
                                    .set('Content-Type', 'application/json')
                                    .send({
                                        "inquiry": {
                                            "user_id": 1,
                                            "car_id": 1,
                                            "pick_up_location_id": 1,
                                            "drop_off_location_id": 1,
                                            "pick_up_earliest_time": new Date,
                                            "drop_off_latest_time": new Date
                                        }
                                    });

            if (response.body.success === true) {
                try {
                    let deleteResponse = await chai.request(baseURI)
                                                    .del('/users/delete')
                                                    .set('Content-Type', 'application/json')
                                                    .send({
                                                        "user": {
                                                            "id": 1
                                                        }
                                                    });

                    deleteResponse.should.have.property('error');
                    deleteResponse.status.should.equal(422);
                } catch (err) {
                    err.status.should.equal(422);
                    err.body.status.should.equal(422);
                }
             }
        });
    });
});