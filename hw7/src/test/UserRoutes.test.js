const request = require('supertest');
const app = require('../../index')
const { Sequelize } = require('sequelize');
const process = require('process');
const dotenv = require('dotenv');
dotenv.config();
describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })

describe('User routes tests', () => {
  let sequelize
  beforeEach(() => {
     sequelize = new Sequelize(process.env.DB_LINK);
  })
  it("Should create and return status 200 ", async () => {

    await sequelize.authenticate();

    const response = await request(app).post('/user').send({
      login: "nazarkon20",
      password: "Hameleon2222",
      age: 5,
      isDeleted: false
    })

    await sequelize.sync()

    expect(response.statusCode).toBe(200)

  })

  it("Should return status 400 if value are missing ", async () => {

    await sequelize.authenticate();

    const response = await request(app).post('/user').send({
      login: "nazarkon20",
      password: "Hameleon2222",
      age: 5,
    })

    await sequelize.sync()

    expect(response.statusCode).toBe(400)

  })

  it("Should return status 200 if id provided ", async () => {

    await sequelize.authenticate();

    const response = await request(app).get(`/user/${1}`)

    await sequelize.sync()

    expect(response.statusCode).toBe(200)

  })

  it("Should return status 500 if no id provided", async () => {

    await sequelize.authenticate();

    const response = await request(app).get(`/user/${null}`)

    await sequelize.sync()

    expect(response.statusCode).toBe(500)

  })

  it("Should return status 200 if user deleted ", async () => {

    await sequelize.authenticate();

    const response = await request(app).delete(`/user/${1}`)

    await sequelize.sync()

    expect(response.statusCode).toBe(200)

  })

  it("Should return status 500 if no id provided ", async () => {

    await sequelize.authenticate();

    const response = await request(app).delete(`/user/${null}`)

    await sequelize.sync()

    expect(response.statusCode).toBe(500)

  })
  afterEach(() => {
    sequelize.close();
  })
})