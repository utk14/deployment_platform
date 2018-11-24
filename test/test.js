/* eslint import/no-unresolved: 0 */
/* global it describe beforeEach: true */
const chai = require('chai');

chai.should();
// const express = require('express');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
const serverObject = require('../server');

const { app } = serverObject;
// const app = serverObject.app;
// const server = serverObject.server;


chai.use(chaiHttp);
// const assert = chai.assert;

describe('Testing Express Routes:', () => {
  let request;

  beforeEach(() => {
    request = supertest(app);
    console.log('\n');
    // request = chai.request(app);
  });

  it('ExpressRoute:  /auth', (done) => {
    request.get('/auth')
    //   .expect(302)
      .end((err, res) => {
        if (err) throw err;
        // console.log(res.body)
        res.should.status(302);
        // expect(2).to.equal(3)
        // chai.assert('')
      });

    done();
  });

  it('ExpressRoute:  /auth/gitlab', (done) => {
    request.get('/auth/gitlab')
      .end((err, res) => {
        if (err) throw err;

        res.should.status(302);
      });

    done();
  });

  it('ExpressRoute:  /deploy', (done) => {
    request.post('/deploy').send({
      url: 'https://github.com/ishawakankar/test2',
    })
      .end((err, res) => {
        if (err) throw err;

        res.should.status(302);
      });

    done();
  });

  it('ExpressRoute:  /apps', (done) => {
    request.get('/apps')
      .end((err, res) => {
        if (err) throw err;

        res.should.status(200);


        //   console.log('ExpressRoute:  /apps')
        //   console.log('Status: ' + res.status + ', ' + res.res.statusMessage)
        //   console.log('Url: ' + res.headers.location)
        //   console.log('ClientError: ' + res.clientError)
        //   console.log('ServerError: ' + res.serverError)
      });

    done();
  });
});
