const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const testUser = {
    username: 'testUser',
    password: 'test123'
}

beforeAll(async () => {
    await User.deleteMany({})
})


test('user registration', async () => {
    const res = await api.post('/users/register')
        .send(testUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

    console.log(res.body)
    expect(res.body.status).toContain('success')

})

test('user login', async () => {
    const res = await api.post('/users/login')
        .send(testUser)
        .expect(200)
    console.log(res.body)
    expect(res.body.status).toContain('Success')

})

afterAll(async () => {
    await mongoose.connection.close()
})