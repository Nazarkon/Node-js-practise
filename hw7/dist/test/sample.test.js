'use strict';

var request = require('supertest');
var app = require('../../index');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var process = require('process');
var dotenv = require('dotenv');
dotenv.config();
describe('Sample Test', function () {
  it('should test that true === true', function () {
    expect(true).toBe(true);
  });
});

describe('Sample Test', function () {
  var sequelize = void 0;
  beforeEach(function () {
    sequelize = new Sequelize(process.env.DB_LINK);
  });
  test("Should POST request", async function () {

    await sequelize.authenticate();

    var response = await request(app).post('/user').send({
      login: "nazarkon20",
      password: "Hameleon2222",
      age: 5,
      isDeleted: false
    });

    expect(response.statusCode).toBe(200);
  });
  afterEach(function () {
    sequelize.close();
  });
});