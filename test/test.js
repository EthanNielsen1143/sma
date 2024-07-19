const request = require('supertest');
const app = require('../server');

let expect;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

describe('GET Endpoints', function() {
  this.timeout(20000); 

  it('GET /spills should return all spills', async () => {
    const res = await request(app).get('/spills');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /workers should return all workers', async () => {
    const res = await request(app).get('/workers');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /managers should return all managers', async () => {
    const res = await request(app).get('/managers');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /summaries should return all summaries', async () => {
    const res = await request(app).get('/summaries');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});